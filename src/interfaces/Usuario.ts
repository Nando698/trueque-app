export interface Usuario {
    id: number
    nombre: string
    correo: string
    password: string
    rol: "ADMIN" | "REGULAR"
    estado: "ACTIVO" | "INACTIVO"
    fecha_creacion: string // o Date si usás objetos Date
  }