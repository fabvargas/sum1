import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { RutinaLvl } from '../services/gym-mode.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: false,
})
export class SignUpPage {
  
  nombre = '';
  email = '';
  password = '';
  confirmPassword = '';
  fechaNacimiento = '';
  nivel=" ";

  constructor(
    private router: Router,
     private alertController: AlertController,
     private userService: UserService
    ) { 
   
    
  }

  validateNombre() {
    return this.nombre.length >= 3;
  }

  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(this.email);
  }
  validatePassword() {
    return this.password.length >= 4 && this.password.length <= 8;
  }

  validateConfirmPassword() {
    return this.confirmPassword === this.password;
  }



  validateForm() {
    return this.validateNombre() && this.validateEmail() && this.validatePassword() && this.validateConfirmPassword();
  }

  async showAlert(message: string, header: string = 'Error') {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async onSubmit() {
    if (this.validateForm()) {
      await this.userService.registerUser({
        email : this.email,
        name: this.nombre,
        password: this.password,
        birthdate: this.fechaNacimiento,
        nivel:this.nivel as RutinaLvl
      })

    } else {
      let errorMessage = 'Por favor, corrige los siguientes errores:\n';
      if (!this.validateNombre()) {
        errorMessage += '- El nombre debe tener al menos 3 caracteres.\n';
      }
      if (!this.validateEmail()) {
        errorMessage += '- El email no es válido.\n';
      }
      if (!this.validatePassword()) {
        errorMessage += '- La contraseña debe tener entre 4 y 8 caracteres.\n';
      }
      if (!this.validateConfirmPassword()) {
        errorMessage += '- Las contraseñas no coinciden.\n';
      }
      this.showAlert(errorMessage);
    }
  }
}
