import { Injectable } from '@angular/core';

export interface Ejercicio {
  nombre: string;
   imagen: string; 
  duracion_segundos: number;
  descanso_segundos: number;
  descripcion: string;
}

export interface RutinaGimnasio {
  nombre: string;

  nivel: 'Easy' | 'Medium' | 'Hard';
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
    "nivel": "Easy",
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
]
 

  constructor() { }

  obtenerRutina(): RutinaGimnasio {
    return this.rutinas[0]; 
  }


}
