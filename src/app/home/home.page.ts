import { Component, OnInit } from '@angular/core';
import {Camera,CameraResultType } from '@capacitor/camera';
import { UserService } from '../services/user.service';
import { RutinaLvl } from '../services/gym-mode.service';
import { Subscription } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  nombreUsuario:string = 'Carlos Gómez';
  idUsuario: number = 12345;
modoDificultad: RutinaLvl | null = null;

  progreso = 60;
  fechaActual = new Date();
  ultimaRutina = new Date('2024-04-01');
  diasEntrenados = 1;
  ejerciciosCompletados = 1;

    imageSource: any

    private userSub!: Subscription;
    private perfilSub!: Subscription;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private toastController: ToastController
  ) {
    this.imageSource="https://github.com/shadcn.png"
  }

  ngOnInit() {
    this.userSub = this.userService.user.subscribe(async user => {
      if (user) {
        this.nombreUsuario = user.name;
        this.modoDificultad = user.nivel;
        this.idUsuario = user.id;

        // 🔹 Carga inicial del perfil
        await this.profileService.loadPerfil(user.id);

        // 🔹 Suscripción al perfil
        this.perfilSub = this.profileService.perfil$.subscribe(perfil => {
          if (perfil) {
            this.diasEntrenados = perfil.dias_entrenados;
            this.ejerciciosCompletados = perfil.ejercicios_completos;
            this.ultimaRutina = new Date(perfil.ultima_rutina || '');
            this.progreso= this.porcentajeProgreso(this.diasEntrenados)
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
    this.perfilSub?.unsubscribe();
  }

  porcentajeProgreso(dias: number){
    return Math.round((dias / 30) * 100);
  }

  obtenerColorProgreso(): string {
    if (this.progreso < 40) return 'warn';
    if (this.progreso < 80) return 'accent';
    return 'primary';
  }

  obtenerColorDificultad(): string {
    switch (this.modoDificultad) {
      case RutinaLvl.EASY:
        return 'success';
      case RutinaLvl.MEDIUM:
        return 'warning';
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
