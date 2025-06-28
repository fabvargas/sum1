import { Component, OnInit } from '@angular/core';
import { GymModeService, Ejercicio } from '../services/gym-mode.service';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: false,
})
export class StartPage implements OnInit {
  ejercicios?: Ejercicio[];
  actualEjercicioIndex: number = 0;

  constructor(
    private rutina: GymModeService,
     private router: Router,
    private perfilService: ProfileService
    ) {}

  ngOnInit() {
    this.cargarRutina();
  }

async cargarRutina() {
  const rutina = await this.rutina.obtenerRutina();
  if (rutina) {
    this.ejercicios = rutina.ejercicios;
  } else {
    this.ejercicios = []
  }
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
    this.updatePerfil()
    this.router.navigate(['/user/home']);
  }

  updatePerfil(){
     this.perfilService.updateProgresoRutinaCompleto(this.ejercicios?.length ?? 0)
  }

}
