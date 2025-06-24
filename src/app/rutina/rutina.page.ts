import { Component, OnInit } from '@angular/core';
import { GymModeService, Ejercicio, RutinaGimnasio } from '../services/gym-mode.service';
import { ApiClientService } from '../services/api-client.service';

@Component({
  selector: 'app-rutina',
  templateUrl: './rutina.page.html',
  styleUrls: ['./rutina.page.scss'],
  standalone: false,
})
export class RutinaPage implements OnInit {
  ejercicios?: Ejercicio[];
  rutinaCompleta?: RutinaGimnasio;
  comments:any[]=[]
   nuevoComentario = {
    texto: ''
  };

  constructor(
    private rutina: GymModeService,
    private commentService : ApiClientService
  ) {}

  ngOnInit() {
    this.cargarRutina();
    this.commentService.getComments().subscribe(
      (comments)=>{
        this.comments= comments.slice(0,3)
      },
      (err)=>{
        console.log("api error" + err)
      }
    )
  }

  cargarRutina() {
    this.rutinaCompleta = this.rutina.obtenerRutina();
    this.ejercicios = this.rutinaCompleta.ejercicios;
  }

  agregarComentario(){

  }
}