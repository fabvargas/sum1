import { Component, OnInit } from '@angular/core';
import { GymModeService, Ejercicio, RutinaGimnasio } from '../services/gym-mode.service';

@Component({
  selector: 'app-rutina',
  templateUrl: './rutina.page.html',
  styleUrls: ['./rutina.page.scss'],
  standalone: false,
})
export class RutinaPage implements OnInit {
  ejercicios?: Ejercicio[];
  rutinaCompleta?: RutinaGimnasio;

  constructor(private rutina: GymModeService) {}

  ngOnInit() {
    this.cargarRutina();
  }

  cargarRutina() {
    this.rutinaCompleta = this.rutina.obtenerRutina();
    this.ejercicios = this.rutinaCompleta.ejercicios;
  }
}