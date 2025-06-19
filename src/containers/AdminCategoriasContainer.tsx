'use client';

import { useEffect, useState } from 'react';
import { obtenerCategorias, crearCategoria, eliminarCategoria } from '@/connect/categorias';
import { Categoria } from '@/interfaces/Categoria';
import CatAdmin from '@/components/catAdmin';

interface Props {
  onError: (mensaje: string) => void;
}

export default function AdminCategoriasContainer({ onError }: Props) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const cargarCategorias = async () => {
    try {
      const cats = await obtenerCategorias();
      setCategorias(cats);
    } catch (error: any) {
      onError(`Error al obtener categorías: ${error?.message || 'desconocido'}`);
    }
  };

  const handleCrear = async (nombre: string) => {
    try {
      await crearCategoria(nombre);
      await cargarCategorias();
    } catch (error: any) {
      onError(`Error al crear categoría: ${error?.message || 'desconocido'}`);
    }
  };

  const handleEliminar = async (cat: Categoria) => {
    try {
      await eliminarCategoria(cat.id);
      setCategorias((prev) => prev.filter((c) => c.id !== cat.id));
    } catch (error: any) {
      onError(`Error al eliminar categoría: ${error.response.data.message || 'desconocido'}`);
      console.log(error)
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <CatAdmin
      categorias={categorias}
      onCrear={handleCrear}
      onEliminar={handleEliminar}
    />
  );
}
