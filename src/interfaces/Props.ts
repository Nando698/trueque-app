import { Usuario } from "./Usuario";

export interface Props {
    usuarios: Usuario[];
    paginaActual: number;
    totalPaginas: number;
    setPaginaActual: (pagina: number) => void;
}