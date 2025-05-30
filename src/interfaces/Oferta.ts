import { Categoria } from "./Categoria"

export interface Oferta {
    id: number
    titulo: string
    descripcion: string
    imagenes: string[]
    categoria: Categoria
    fecha_publicacion: string
    estado: string
  }