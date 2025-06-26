import { Injectable } from '@angular/core';
import { UserService } from './user.service';


export interface Ejercicio {
  nombre: string;
   imagen: string; 
  duracion_segundos: number;
  descanso_segundos: number;
  descripcion: string;
}

export enum RutinaLvl {
  EASY = "EASY",
  MEDIUM = "MEDIUM"
}


export interface RutinaGimnasio {
  nombre: string;
  nivel: RutinaLvl;
  descripcion: string;
  ejercicios: Ejercicio[];
  repeticiones_circuito: number;
  descanso_entre_circuitos_segundos: number;
}



@Injectable({
  providedIn: 'root'
})
export class GymModeService {

  rutinas: RutinaGimnasio[] = [
    {
    "nombre": "HIIT Básico en Casa",
    "nivel": RutinaLvl.EASY,
    "descripcion": "Rutina HIIT de cuerpo completo para mejorar la resistencia cardiovascular y quemar grasa. Ideal para entrenar en casa sin equipamiento. Duración total aproximada: 25 minutos.",
    "ejercicios": [
      {
        "nombre": "Jumping Jacks",
        "imagen":"assets/easy/jumping.jpeg",
        "duracion_segundos": 30,
        "descanso_segundos": 15,
        "descripcion": "Salta abriendo piernas y brazos al mismo tiempo, luego vuelve a la posición inicial."
      },
      {
        "nombre": "Sentadillas con salto",
        "imagen":"assets/easy/sentadilla.webp",
        "duracion_segundos": 30,
        "descanso_segundos": 15,
        "descripcion": "Haz una sentadilla y al subir salta con impulso, aterrizando suavemente."
      },
      {
        "nombre": "Mountain Climbers",
       "imagen":"assets/easy/climb.webp",
        "duracion_segundos": 30,
        "descanso_segundos": 15,
        "descripcion": "En posición de plancha, lleva las rodillas al pecho rápidamente, alternando piernas."
      },
      {
        "nombre": "Flexiones (Push-ups)",
        "imagen":"assets/easy/push.webp",
        "duracion_segundos": 30,
        "descanso_segundos": 15,
        "descripcion": "Baja el cuerpo manteniendo la espalda recta, y sube usando fuerza en brazos y pecho."
      },
      {
        "nombre": "Plancha con toque de hombros",
        "imagen":"assets/easy/plancha.webp",
        "duracion_segundos": 30,
        "descanso_segundos": 15,
        "descripcion": "En plancha, toca el hombro opuesto con cada mano alternadamente sin mover el tronco."
      },
      {
        "nombre": "Burpees",
        "imagen":"assets/easy/burpee.jpg",
        "duracion_segundos": 30,
        "descanso_segundos": 15,
        "descripcion": "Desde de pie, baja en cuclillas, haz una flexión, vuelve a pararte y salta con los brazos arriba."
      }
    ],
    "repeticiones_circuito": 3,
    "descanso_entre_circuitos_segundos": 60
  },
  {
  "nombre": "Entrenamiento Funcional Intermedio",
  "nivel": RutinaLvl.MEDIUM,
  "descripcion": "Rutina funcional para fortalecer músculos, mejorar equilibrio y quemar calorías. Ideal para quienes ya tienen algo de experiencia entrenando. Duración aproximada: 30 minutos.",
  "ejercicios": [
    {
      "nombre": "Sentadillas con pausa",
      "imagen": "assets/medium/sentadilla_pausa.webp",
      "duracion_segundos": 40,
      "descanso_segundos": 20,
      "descripcion": "Haz una sentadilla profunda y mantén la posición por 2 segundos antes de subir."
    },
    {
      "nombre": "Zancadas alternas",
      "imagen": "assets/medium/zancadas.webp",
      "duracion_segundos": 40,
      "descanso_segundos": 20,
      "descripcion": "Da un paso largo hacia adelante y baja la rodilla trasera sin tocar el suelo, alterna piernas."
    },
    {
      "nombre": "Plancha con elevación de piernas",
      "imagen": "assets/medium/plancha_pierna.webp",
      "duracion_segundos": 40,
      "descanso_segundos": 20,
      "descripcion": "En posición de plancha, eleva una pierna recta hacia arriba y cambia después de unos segundos."
    },
    {
      "nombre": "Escaladores cruzados (Cross-Body Mountain Climbers)",
      "imagen": "assets/medium/escalador_cruzado.webp",
      "duracion_segundos": 40,
      "descanso_segundos": 20,
      "descripcion": "Lleva cada rodilla hacia el codo opuesto rápidamente desde posición de plancha."
    },
    {
      "nombre": "Fondos de tríceps en silla",
      "imagen": "assets/medium/fondos_silla.webp",
      "duracion_segundos": 40,
      "descanso_segundos": 20,
      "descripcion": "Con las manos apoyadas en una silla detrás de ti, baja el cuerpo doblando los codos y vuelve a subir."
    },
    {
      "nombre": "Abdominales bicicleta",
      "imagen": "assets/medium/bicicleta.webp",
      "duracion_segundos": 40,
      "descanso_segundos": 20,
      "descripcion": "En el suelo, lleva el codo derecho hacia la rodilla izquierda y viceversa, como pedaleando en el aire."
    }
  ],
  "repeticiones_circuito": 3,
  "descanso_entre_circuitos_segundos": 90
}
]
 

  constructor(
    private userService:UserService
  ) { }

 

obtenerRutina(): RutinaGimnasio | undefined {
  return this.rutinas.find(r => r.nivel === this.userService.getUserLvl());
}


}
