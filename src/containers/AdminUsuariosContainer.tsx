import UsuariosAdmin from "@/components/usuariosAdmin";
import { useUsuarios } from "@/hooks/useUsuarios";
import { useState } from "react";

export default function AdminUsuariosContainer({ onError }: { onError: (msg: string) => void }) {
    const [paginaActual, setPaginaActual] = useState(1);
    const itemsPorPagina = 5;
    
    const { usuarios, totalPaginas } = useUsuarios(paginaActual, itemsPorPagina,onError);
  
    return (
      <UsuariosAdmin
        usuarios={usuarios}
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        setPaginaActual={setPaginaActual}
      />
    );
  }
  