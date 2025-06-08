import { Component, OnInit } from '@angular/core';

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

  constructor() {}

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

}
