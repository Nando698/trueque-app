import { obtenerUsuariosPaginado } from "@/connect/users";
import { Usuario } from "@/interfaces/Usuario";
import { useEffect, useState } from "react";

export function useUsuarios(paginaActual: number, itemsPorPagina: number, onError?: (mensaje: string) => void) {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [totalPaginas, setTotalPaginas] = useState(1);
  
    useEffect(() => {
      const fetchUsuarios = async () => {
        try {
          const res = await obtenerUsuariosPaginado(paginaActual, itemsPorPagina);
          setUsuarios(res.data);
          setTotalPaginas(Math.ceil(res.total / itemsPorPagina));
        } catch (error: any) {
          if(onError)
            onError(`Error cargando los usuarios, codigo: ${error.response.status}`)
        }
      };
  
      fetchUsuarios();
    }, [paginaActual]);
  
    return { usuarios, totalPaginas };
  }