import { useEffect, useState } from 'react';
import { obtenerCategorias } from '@/connect/categorias';
import { Categoria } from '@/interfaces/Categoria';

export const useCategorias = (onError?: (msg: string) => void) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await obtenerCategorias();
        setCategorias(data);
      } catch(error) {
        onError?.(`${error}`);
      }
    };
    fetch();
  }, []);

  return { categorias, setCategorias };
};
