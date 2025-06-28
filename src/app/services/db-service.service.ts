import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

   public db!: SQLiteObject;
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private tablaUsers = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      birthdate TEXT NOT NULL,
      nivel TEXT NOT NULL
    );
  `;
private tablaPerfil = `
  CREATE TABLE IF NOT EXISTS perfil (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userid INTEGER NOT NULL,
    dias_entrenados INTEGER NOT NULL,
    ejercicios_completos INTEGER NOT NULL,
    ultima_rutina DATE,
    FOREIGN KEY (userid) REFERENCES users(id)
  );
`;
  constructor(
      private sqlite: SQLite,
    private platform: Platform,
    private toastController: ToastController
  ) { 
     this.crearBaseDatos();
  }

   dbState() {
    return this.isDBReady.asObservable();
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

  private async crearBaseDatos() {
  await this.platform.ready();

  try {
    const db = await this.sqlite.create({
      name: 'mydb.db',
      location: 'default'
    });

    this.db = db;
    
  
    await this.crearTablas(); 
  
  } catch (e) {
    this.presentToast("Error al crear la base de datos: " + JSON.stringify(e));
  } 
}

async agregarInicialData() {
  try {
    const res = await this.db.executeSql(
      'SELECT COUNT(*) as total FROM users WHERE email = ?',
      ['fab@gmail.com']
    );

    if (res.rows.item(0).total > 0) {
      this.presentToast("Usuario inicial ya existe. No se duplicará.");
      return;
    }

    // Insertar usuario
    await this.db.executeSql(
      `INSERT INTO users (name, email, password, birthdate, nivel) VALUES (?, ?, ?, ?, ?)`,
      ['Fabián Vargas', 'fab@gmail.com', '1234', '1990-01-01', 'EASY']
    );

    // Obtener ID del usuario insertado
    const usuarioInsertado = await this.db.executeSql(
      'SELECT id FROM users WHERE email = ?',
      ['fab@gmail.com']
    );

    const userId = usuarioInsertado.rows.item(0).id;

    // Insertar perfil con fecha de última rutina
    const fechaUltimaRutina = '2025-06-01'; // o puedes usar new Date().toISOString().split('T')[0]

    await this.db.executeSql(
      `INSERT INTO perfil (userid, dias_entrenados, ejercicios_completos, ultima_rutina) VALUES (?, ?, ?, ?)`,
      [userId, 7, 43, fechaUltimaRutina]
    );

    this.presentToast("Datos iniciales insertados.");
  } catch (e) {
    this.presentToast("Error al insertar usuario: " + JSON.stringify(e));
  }
}



private async crearTablas() {
  try {
    await this.db.executeSql(this.tablaUsers, []);
    await this.db.executeSql(this.tablaPerfil, []);
    this.isDBReady.next(true);
    this.presentToast("Tablas creadas correctamente.");
  } catch (e) {
    this.presentToast("Error al crear las tablas: " + JSON.stringify(e));
  }
}

async limpiarTablas() {
  try {
   
    await this.db.executeSql('DELETE FROM perfil;', []);
    await this.db.executeSql("DELETE FROM sqlite_sequence WHERE name='perfil';", []);

 
    await this.db.executeSql('DELETE FROM users;', []);
    await this.db.executeSql("DELETE FROM sqlite_sequence WHERE name='users';", []);

    this.presentToast("Datos eliminados e IDs reiniciados.");
  } catch (e) {
    this.presentToast("Error al limpiar tablas: " + JSON.stringify(e));
    console.error("Error:", e);
  }
}


public async mostrarInfoTablas() {
  try {
    if (!this.db) {
      this.presentToast('Base de datos no inicializada.');
      return;
    }

    // Consulta de usuarios
    const resUsers = await this.db.executeSql('SELECT * FROM users', []);
    let userInfo = 'Tabla: users\n';

    if (resUsers.rows.length === 0) {
      userInfo += 'No hay usuarios.\n';
    } else {
      for (let i = 0; i < resUsers.rows.length; i++) {
        const row = resUsers.rows.item(i);
        userInfo += `• ${row.name} (${row.email}) - Pass: ${row.password} - Nivel: ${row.nivel}\n`;
      }
    }

    // Consulta de perfiles
    const resPerfil = await this.db.executeSql('SELECT * FROM perfil', []);
    let perfilInfo = '\nTabla: perfil\n';

    if (resPerfil.rows.length === 0) {
      perfilInfo += 'No hay perfiles.\n';
    } else {
      for (let i = 0; i < resPerfil.rows.length; i++) {
        const row = resPerfil.rows.item(i);
        perfilInfo += `• UserID: ${row.userid} | Dias entrenados: ${row.dias_entrenados} | Ejercicios completados: ${row.ejercicios_completos} | Última rutina: ${row.ultima_rutina}\n`;
      }
    }

    const mensaje = userInfo + perfilInfo;

    const alert = await this.toastController.create({
      message: mensaje.replace(/\n/g, '<br>'), // formatea saltos de línea en HTML
      duration: 7000,
      position: 'middle',
      cssClass: 'custom-toast'
    });
    await alert.present();

  } catch (e) {
    this.presentToast('Error al consultar información: ' + JSON.stringify(e));
  }
}



}
