import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbServiceService } from '../services/db-service.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false 
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private alertController:AlertController,
      private dbcontext:DbServiceService,
      private userService : UserService
  ) { }

    async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  validatePassword(password: string): boolean {
    return password.length >= 4 && password.length <= 8;
  }

 async onLogin() {
  if (this.validateEmail(this.email) && this.validatePassword(this.password)) {
    const success = await this.userService.validateLogin(this.email, this.password);
    if (success) {
      this.router.navigate(['/user/home']);
    } 
  } else {
    this.showAlert('Por favor, ingrese un correo electrónico y una contraseña válidos.');
  }
}


  async getDbInfo(){
   await this.dbcontext.mostrarInfoTablas()
  }

   async ReicinicarDb(){
  await this.dbcontext.limpiarTablas()  
  await this.dbcontext.agregarInicialData()
 }


}
