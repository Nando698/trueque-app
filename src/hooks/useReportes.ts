import { useEffect, useState } from 'react';
import { obtenerReportes } from '@/connect/reporte';
import { Reporte } from '@/interfaces/reporte';

export function useReportes(onError?: (msg: string) => void) {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await obtenerReportes();
        setReportes(res.data);
      } catch (error) {
        
        if (onError) onError('Error al obtener reportes');
      } finally {
        setCargando(false);
      }
    };

    fetch();
  }, []);

  return { reportes, cargando };
}

