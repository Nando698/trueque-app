'use client';

import CatAdmin from '@/components/catAdmin';
import { useCategorias } from '@/hooks/useCategorias';
import { Categoria } from '@/interfaces/Categoria';

interface Props {
  onError: (mensaje: string) => void;
}

export default function AdminCategoriasContainer({ onError }: Props) {
  const {
    categorias,
    loading,
    createCategoria,
    deleteCategoria,
  } = useCategorias(onError);

  return (
    <>
      {loading && <p>Cargando categorías...</p>}
      <CatAdmin
        categorias={categorias}
        onCrear={(nombre) => createCategoria(nombre)}
        onEliminar={(cat: Categoria) => deleteCategoria(cat.id)}
      />
    </>
  );
}