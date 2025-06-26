import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import type { User, UserRegister } from "./type"
import { DbServiceService } from './db-service.service'; 
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { RutinaLvl } from './gym-mode.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

   private db!:SQLiteObject;

  constructor(
    private dbService:DbServiceService,
    private toastController: ToastController,
   
  ) {
     this.dbService.dbState().subscribe((ready) => {
      if (ready) {
        this.db = this.dbService.db;
      }
      
    });

   }

     private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      icon: 'globe'
    });
    await toast.present();
  }


     private guardarSesionEnLocalStorage(user: any) {
    localStorage.setItem('user_session', JSON.stringify({
      name:user.name,
      id:user.id
    }));
  }

    private cerrarSesionLocal() {
    localStorage.removeItem('user_session');
  }

  private getSesionDesdeLocalStorage(): { name: string; id: number } | null {
  const sesion = localStorage.getItem('user_session');
  return sesion ? JSON.parse(sesion) : null;
}

async logout() {
    const user = this.getSesionDesdeLocalStorage();
    if (user) {
      this.cerrarSesionLocal();
      this.presentToast("Sesión cerrada correctamente");
    } else {
      this.presentToast("No hay sesión activa");
    }
  }

  getUserLvl(){
    return RutinaLvl.MEDIUM

  }


    private async addUser(user: UserRegister): Promise<number | null> {
    if (!this.db) return null;
    try {
      const res = await this.db.executeSql(
        'INSERT INTO users (name, email, password, birthdate ,nivel) VALUES (?, ?, ?, ?, ?)',
        [user.name, user.email, user.password, user.birthdate,user.nivel as string]
      );
      this.presentToast("Usuario agregado correctamente");
      return res.insertId;
    } catch (e) {
     this.presentToast("Error al agregar usuario: " + JSON.stringify(e));
      return null;
    }
  }


    async registerUser(user: UserRegister): Promise<boolean> {
    if (!this.db) return false;
    try {
      const res = await this.db.executeSql('SELECT * FROM users WHERE email = ?', [user.email]);
      if (res.rows.length > 0) {
        this.presentToast("Ya existe una cuenta con este correo.");
        return false;
      }

      const insertId = await this.addUser(user);
      if (insertId !== null) {
        this.guardarSesionEnLocalStorage({
          id: insertId,
          name: user.name,
          email: user.email,
          nivel: user.nivel
        });
        this.presentToast("Registro exitoso.");
        return true;
      }

      this.presentToast("No se pudo registrar el usuario." + user.name + user.birthdate + user.email + user.nivel + user.password);
      return false;
    } catch (e) {
      this.presentToast("Error al registrar usuario: " + e);
      return false;
    }
  }
  

  async validateLogin(email: string, password: string): Promise<boolean> {
    if (!this.db) return false;
    try {
      const res = await this.db.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password]
      );

      if (res.rows.length > 0) {
        const user = {
          id: res.rows.item(0).id,
          name: res.rows.item(0).name,
          email: res.rows.item(0).email,
        };

        this.guardarSesionEnLocalStorage(user);
        this.presentToast("Sesión iniciada correctamente");
        return true;
      } else {
        this.presentToast("Credenciales incorrectas");
        return false;
      }
    } catch (e) {
      this.presentToast("Error al validar login: " + e);
      return false;
    }
  }
 

  isLoggedIn(): boolean {
  return this.getSesionDesdeLocalStorage() !== null;
}

}
