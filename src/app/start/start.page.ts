import { Component, OnInit } from '@angular/core';
import { GymModeService, Ejercicio } from '../services/gym-mode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: false,
})
export class StartPage implements OnInit {
  ejercicios?: Ejercicio[];
  actualEjercicioIndex: number = 0;

  constructor(private rutina: GymModeService, private router: Router) {}

  ngOnInit() {
    this.cargarRutina();
  }

  cargarRutina() {
    this.ejercicios = this.rutina.obtenerRutina().ejercicios;
  }

  get ejercicioActual(): Ejercicio | undefined {
    return this.ejercicios?.[this.actualEjercicioIndex];
  }

  anteriorEjercicio() {
    if (this.actualEjercicioIndex > 0) {
      this.actualEjercicioIndex--;
    }
  }

  siguienteEjercicio() {
    if (this.ejercicios && this.actualEjercicioIndex < this.ejercicios.length - 1) {
      this.actualEjercicioIndex++;
    }
  }

  terminarRutina(): boolean {
    return this.ejercicios !== undefined && this.actualEjercicioIndex === this.ejercicios.length - 1;
  }

  onEndRutina() {
    // Redirige al home u otra página de resultados
    this.router.navigate(['/user/home']);
  }
}
