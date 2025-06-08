import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage {
  nombre: string = '';
  correo: string = '';
  dificultad: string = 'Easy';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  contrasenaActual: string = '';

  // Muestra alertas reutilizables como en LoginPage
  async showAlert(message: string) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Alerta';
    alert.message = message;
    alert.buttons = ['OK'];
    document.body.appendChild(alert);
    await alert.present();
  }

  // Valida el correo electrónico
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  // Valida que el nombre tenga al menos 2 caracteres
  validateNombre(nombre: string): boolean {
    return nombre.trim().length >= 2;
  }

  // Valida la nueva contraseña
  validatePassword(password: string): boolean {
    return password.length >= 6;
  }

  guardarPerfil() {
    if (!this.validateNombre(this.nombre)) {
      this.showAlert('El nombre debe tener al menos 2 caracteres.');
      return;
    }

    if (!this.validateEmail(this.correo)) {
      this.showAlert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (!this.dificultad) {
      this.showAlert('Selecciona una dificultad.');
      return;
    }

    console.log('Perfil actualizado:', {
      nombre: this.nombre,
      correo: this.correo,
      dificultad: this.dificultad,
    });

    this.showAlert('Datos personales actualizados.');
  }

  guardarContrasena() {
    if (!this.contrasenaActual) {
      this.showAlert('Debes ingresar la contraseña actual.');
      return;
    }

    if (!this.validatePassword(this.nuevaContrasena)) {
      this.showAlert('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.showAlert('Las contraseñas no coinciden.');
      return;
    }

    console.log('Contraseña actualizada:', this.nuevaContrasena);
    this.showAlert('Contraseña cambiada correctamente.');
  }
}