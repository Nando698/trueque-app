import { Suspense } from 'react';
import BuscarResultados from '../../../components/BuscarResultados';

export default function BuscarPage() {
  return (
    <Suspense fallback={<p className="text-white p-4">Cargando resultados...</p>}>
      <BuscarResultados />
    </Suspense>
  );
}