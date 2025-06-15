import { Usuario } from "./Usuario";
import { Oferta } from "./Oferta";

export interface Reporte {
  id: number;
  usuario: Usuario;
  oferta: Oferta;
  motivo: string;
  fechaReporte: string; 
}