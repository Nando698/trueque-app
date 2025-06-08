import { Categoria } from "./Categoria"

export interface Oferta {
    id: number
    titulo: string
    descripcion: string
    cambio: string
    imagenes: string[]
    categoria: Categoria
    fechaPublicacion: string
    estado: string
  }