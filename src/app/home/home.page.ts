import { Component, OnInit } from '@angular/core';
import {Camera,CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  nombreUsuario = 'Carlos Gómez';
  idUsuario: number = 12345;
  modoDificultad: 'Easy' | 'Medium' | 'Hard' = 'Easy';
  progreso = 60;

  fechaActual = new Date();
  ultimaRutina = new Date('2024-04-01');
  diasEntrenados = 7;
  ejerciciosCompletados = 43;

    imageSource: any

  constructor() {
    this.imageSource="https://github.com/shadcn.png"
  }

  ngOnInit() {}

  obtenerColorProgreso(): string {
    if (this.progreso < 40) return 'warn';
    if (this.progreso < 80) return 'accent';
    return 'primary';
  }

  obtenerColorDificultad(): string {
    switch (this.modoDificultad) {
      case 'Easy':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'Hard':
        return 'danger';
      default:
        return 'primary';
    }
  }

  async takePicture(){
    const image = await Camera.getPhoto({
      quality:90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    })

   this.imageSource=image.dataUrl

  }


}
