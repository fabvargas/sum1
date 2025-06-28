import { RutinaLvl } from "./gym-mode.service"

export type User = {
    id:number,
    email:string,
    name:string
    password:string
    birthdate:string
    nivel: RutinaLvl
}

export type UserRegister = Omit<User,"id">

export type UserGet = Omit<User,"password" | "birthdate">

export interface Perfil {
  id: number;
  userid: number;
  dias_entrenados: number;
  ejercicios_completos: number;
  ultima_rutina: string | null;
}
