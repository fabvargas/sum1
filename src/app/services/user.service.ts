import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import type { User, UserRegister, UserGet } from "./type"
import { DbServiceService } from './db-service.service'; 
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { RutinaLvl } from './gym-mode.service';
import { ProfileService } from './profile.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

   private db!:SQLiteObject;
   userSubject = new BehaviorSubject<UserGet | null>(null);
  public user: Observable<UserGet | null> = this.userSubject.asObservable();

  constructor(
    private dbService:DbServiceService,
    private toastController: ToastController,
    private perfilService : ProfileService
   
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
  localStorage.setItem('user_session', JSON.stringify(user));
  this.userSubject.next(user); // Notifica a todos los observadores
}

private cerrarSesionLocal() {
  localStorage.removeItem('user_session');
  this.userSubject.next(null); // Limpia el observable
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


private async addUser(user: UserRegister): Promise<number | null> {
  if (!this.db) return null;
  try {
    const res = await this.db.executeSql(
      'INSERT INTO users (name, email, password, birthdate, nivel) VALUES (?, ?, ?, ?, ?)',
      [user.name, user.email, user.password, user.birthdate, user.nivel as string]
    );

    const userId = res.insertId;

    // ✅ Esperar a que el perfil sea creado
    const perfilCreado = await this.perfilService.addProfileByIdUser(userId);

    if (!perfilCreado) {
      this.presentToast("Usuario creado, pero no se pudo crear el perfil.");
      return null;
    }

    this.presentToast("Usuario y perfil creados correctamente.");
    return userId;
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
          nivel:res.rows.item(0).nivel
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

async getUserByEmail(email: string) {
  if (!this.db) return null;

  try {
    const res = await this.db.executeSql(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (res.rows.length > 0) {
      const row = res.rows.item(0);
      const user= {
        id: row.id,
        name: row.name,
        email: row.email,
        nivel: row.nivel
      };
      return user;
    } else {
      return null; 
    }
  } catch (e) {
    this.presentToast("Error al obtener usuario: " + JSON.stringify(e));
    return null;
  }
}

 async updateUserName(id: number, newName: string): Promise<boolean> {
  if (!this.db) return false;

  try {
    const res = await this.db.executeSql(
      'UPDATE users SET name = ? WHERE id = ?',
      [newName, id]
    );

    if (res.rowsAffected > 0) {
     
      const currentUser = this.userSubject.value;
      if (currentUser && currentUser.id === id) {
        this.userSubject.next({
          ...currentUser,
          name: newName
        });
      }

      this.presentToast('Nombre actualizado correctamente.');
      return true;
    } else {
      this.presentToast('No se encontró el usuario para actualizar.');
      return false;
    }
  } catch (e) {
    this.presentToast('Error al actualizar nombre: ' + JSON.stringify(e));
    return false;
  }
}


async updateUserNivel(id: number, newNivel: RutinaLvl): Promise<boolean> {
  if (!this.db) return false;

  try {
    const res = await this.db.executeSql(
      'UPDATE users SET nivel = ? WHERE id = ?',
      [newNivel, id]
    );

    if (res.rowsAffected > 0) {
      // Actualizar el observable
      const currentUser = this.userSubject.value;
      if (currentUser && currentUser.id === id) {
        this.userSubject.next({
          ...currentUser,
          nivel: newNivel
        });
      }

      this.presentToast('Nivel actualizado correctamente.');
      return true;
    } else {
      this.presentToast('No se encontró el usuario para actualizar.');
      return false;
    }
  } catch (e) {
    this.presentToast('Error al actualizar nivel: ' + JSON.stringify(e));
    return false;
  }
}

async updateUserPassword(id: number, newPassword: string): Promise<boolean> {
  if (!this.db) return false;

  if (newPassword.length < 4) {
    this.presentToast('La contraseña debe tener al menos 4 caracteres.');
    return false;
  }

  try {
    const res = await this.db.executeSql(
      'UPDATE users SET password = ? WHERE id = ?',
      [newPassword, id]
    );

    if (res.rowsAffected > 0) {
      this.presentToast('Contraseña actualizada correctamente.');
      return true;
    } else {
      this.presentToast('No se encontró el usuario para actualizar la contraseña.');
      return false;
    }
  } catch (e) {
    this.presentToast('Error al actualizar contraseña: ' + JSON.stringify(e));
    return false;
  }
}


}
