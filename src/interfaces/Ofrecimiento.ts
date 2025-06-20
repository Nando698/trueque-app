import { Oferta } from "./Oferta";
import { Usuario } from "./Usuario";

export interface Ofrecimiento {
    id: number;
    mensaje: string;
    fecha: string;
    estado: 'PENDIENTE' | 'ACEPTADO' | 'RECHAZADO';
    usuario: Usuario;
    oferta: Oferta;
  }
  