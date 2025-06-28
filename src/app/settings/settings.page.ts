import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { RutinaLvl } from '../services/gym-mode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage {
  nombre: string = '';
  dificultad: RutinaLvl = RutinaLvl.EASY;
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  contrasenaActual: string = '';
  userId=0

  userOriginalName: string = ''; 
userOriginalNivel: string = ''; 

private userSub!: Subscription;

  constructor(
    private userService : UserService
    
  ){

  }

ngOnInit() {
  this.userSub = this.userService.user.subscribe(user => {
    if (user) {
      this.nombre = user.name;
      this.dificultad = user.nivel;
      this.userId = user.id;

      this.userOriginalName = this.nombre;
      this.userOriginalNivel = this.dificultad;
    }
  });
}


  // Muestra alertas reutilizables como en LoginPage
  async showAlert(message: string) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Alerta';
    alert.message = message;
    alert.buttons = ['OK'];
    document.body.appendChild(alert);
    await alert.present();
  }

  // Valida que el nombre tenga al menos 2 caracteres
  validateNombre(nombre: string): boolean {
    return nombre.trim().length >= 2;
  }

  // Valida la nueva contraseña
  validatePassword(password: string): boolean {
    return password.length >= 6;
  }

async guardarPerfil() {
  // Validaciones
  if (!this.validateNombre(this.nombre)) {
    this.showAlert('El nombre debe tener al menos 2 caracteres.');
    return;
  }

  if (!this.dificultad) {
    this.showAlert('Selecciona una dificultad.');
    return;
  }

  const nombreCambio = this.nombre !== this.userOriginalName;
  const nivelCambio = this.dificultad !== this.userOriginalNivel;

  if (!nombreCambio && !nivelCambio) {
    return;
  }

  try {
   

    if (nombreCambio) {
      await this.userService.updateUserName(this.userId, this.nombre);
    }

    if (nivelCambio) {
      await this.userService.updateUserNivel(this.userId, this.dificultad);
    }


  } catch (e) {
    this.showAlert('Error al actualizar el perfil: ' + JSON.stringify(e));
  }
}


 async guardarContrasena() {
  if (!this.contrasenaActual || !this.nuevaContrasena || !this.confirmarContrasena) {
    this.showAlert('Por favor, completa todos los campos.');
    return;
  }

  if (this.nuevaContrasena !== this.confirmarContrasena) {
    this.showAlert('La nueva contraseña y la confirmación no coinciden.');
    return;
  }

  try {
    const user = await this.userService.userSubject.value;

    if (!user) {
      this.showAlert('Usuario no autenticado.');
      return;
    }

    const validLogin = await this.userService.validateLogin(user.email, this.contrasenaActual);
    if (!validLogin) {
      this.showAlert('La contraseña actual es incorrecta.');
      return;
    }

    await this.userService.updateUserPassword(user.id, this.nuevaContrasena);

  } catch (e) {
    this.showAlert('Error al actualizar contraseña: ' + JSON.stringify(e));
  }
}

}