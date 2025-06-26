export type User = {
    id:number,
    email:string,
    name:string
    password:string
    birthdate:string
    nivel:"EASY" | "MEDIUM"
}

export type UserRegister = Omit<User,"id">

