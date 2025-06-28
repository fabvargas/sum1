import { Injectable } from '@angular/core';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { DbServiceService } from './db-service.service';
import type { Perfil } from './type'; // Asegúrate de importar el tipo correcto

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private db!: SQLiteObject;

  private perfilSubject = new BehaviorSubject<Perfil | null>(null);
  public perfil$: Observable<Perfil | null> = this.perfilSubject.asObservable();

  constructor(
    private dbService: DbServiceService,
    private toastController: ToastController
  ) {
    this.dbService.dbState().subscribe(ready => {
      if (ready) {
        this.db = this.dbService.db;
      }
    });
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  async loadPerfil(userId: number): Promise<void> {
    const perfil = await this.getPerfilByUserId(userId);
    this.perfilSubject.next(perfil);
  }

  async getPerfilByUserId(userId: number): Promise<Perfil | null> {
    if (!this.db) return null;
    try {
      const res = await this.db.executeSql(
        'SELECT * FROM perfil WHERE userid = ?',
        [userId]
      );

      if (res.rows.length > 0) {
        const row = res.rows.item(0);
        const perfil: Perfil = {
          id: row.id,
          userid: row.userid,
          dias_entrenados: row.dias_entrenados,
          ejercicios_completos: row.ejercicios_completos,
          ultima_rutina: row.ultima_rutina
        };
        return perfil;
      } else {
        this.presentToast("Perfil no encontrado");
        return null;
      }
    } catch (e) {
      this.presentToast("Error al obtener perfil: " + JSON.stringify(e));
      return null;
    }
  }

async updateProgresoRutinaCompleto(nuevosEjercicios: number): Promise<boolean> {
  if (!this.db) return false;

  try {
   
    const perfil = this.perfilSubject.value;

    if (!perfil) {
      this.presentToast("Perfil no encontrado");
      return false;
    }

    const totalEjercicios = perfil.ejercicios_completos + nuevosEjercicios;
    const totalDias = perfil.dias_entrenados + 1;
    const fechaActual = new Date().toISOString().split('T')[0]; 

    const res = await this.db.executeSql(
      `UPDATE perfil 
       SET ejercicios_completos = ?, ultima_rutina = ?, dias_entrenados = ?
       WHERE userid = ?`,
      [totalEjercicios, fechaActual, totalDias, perfil.userid]
    );

    if (res.rowsAffected > 0) {
      await this.loadPerfil(perfil.userid);
      this.presentToast("Progreso completo actualizado");
      return true;
    } else {
      this.presentToast("No se encontró perfil para actualizar");
      return false;
    }
  } catch (e) {
    this.presentToast("Error al actualizar progreso: " + JSON.stringify(e));
    return false;
  }
}


async addProfileByIdUser(userId: number): Promise<boolean> {
  if (!this.db) return false;

  try {

    const res = await this.db.executeSql(
      `INSERT INTO perfil (userid, dias_entrenados, ejercicios_completos, ultima_rutina)
       VALUES (?, ?, ?, ?)`,
      [userId, 0, 0, null]
    );

    if (res.rowsAffected > 0) {
      await this.loadPerfil(userId);
      this.presentToast('Perfil creado correctamente.');
      return true;
    } else {
      this.presentToast('No se pudo crear el perfil.');
      return false;
    }
  } catch (e) {
    this.presentToast('Error al crear perfil: ' + JSON.stringify(e));
    return false;
  }
}


}
