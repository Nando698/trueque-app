import { Oferta } from "./Oferta";
import { Ofrecimiento } from "./Ofrecimiento";
import { Usuario } from "./Usuario";

export interface DataPerfil {
    perfil: Usuario | null;
    ofertasPropias: Oferta[];
    favoritos: Oferta[];
    pausadas: Oferta[];
    enviados: Ofrecimiento[];
    recibidos: Ofrecimiento[];
    loading: boolean;
    error: string | null;
  }