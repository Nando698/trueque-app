import { useState, useEffect } from 'react';
import {
  obtenerCategorias,
  crearCategoria as apiCrearCategoria,
  eliminarCategoria as apiEliminarCategoria,
} from '@/connect/categorias';
import { Categoria } from '@/interfaces/Categoria';

export const useCategorias = (onError?: (msg: string) => void) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCategorias = async () => {
    setLoading(true);
    try {
      const data = await obtenerCategorias();
      setCategorias(data);
    } catch (error: any) {
      const msg = error?.message || 'desconocido';
      onError?.(`Error al cargar categorías: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const createCategoria = async (nombre: string) => {
    try {
      await apiCrearCategoria(nombre);
      await loadCategorias();
    } catch (error: any) {
      const msg = error?.message || 'desconocido';
      onError?.(`Error al crear categoría: ${msg}`);
    }
  };

  const deleteCategoria = async (id: number) => {
    try {
      await apiEliminarCategoria(id);
      setCategorias((prev) => prev.filter((c) => c.id !== id));
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || error?.message || 'desconocido';
      onError?.(`Error al eliminar categoría: ${msg}`);
    }
  };

  useEffect(() => {
    loadCategorias();
  }, []);

  return {
    categorias,
    loading,
    createCategoria,
    deleteCategoria,
    reload: loadCategorias,
  };
};