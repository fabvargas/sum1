import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false 
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private router: Router) {
   
  }

  showAlert(message: string) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Alerta';
    alert.message = message;
    alert.buttons = ['OK'];
    document.body.appendChild(alert);
    return alert.present();
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  validatePassword(password: string): boolean {
    return password.length >= 4 && password.length <= 8;
  }

  onLogin() {
    console.log(this.email, this.password);
    if (this.validateEmail(this.email) && this.validatePassword(this.password)) {
      this.router.navigate(['/user/home']);
    }else{
      this.showAlert('Por favor, ingrese un correo electrónico y una contraseña válidos.');
    }
  }

  irARegistro() {
  (document.activeElement as HTMLElement)?.blur(); 
  this.router.navigate(['/sign-up']);
}
}
