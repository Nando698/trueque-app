import { Oferta } from "./Oferta";
import { Usuario } from "./Usuario";

export interface Ofrecimiento {
  id: number;
  mensaje: string;
  estado: string;
  usuario: Usuario;
  oferta: Oferta;
  contacto?: {
    nombre: string;
    correo: string;
    telefono: string;
  };
}

  