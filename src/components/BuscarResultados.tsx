'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import OfferCard from './MainCard';
import { Oferta } from '@/interfaces/Oferta';
import { buscarOfertas } from '@/connect/ofertas';

export default function BuscarResultados() {
  const searchParams = useSearchParams();
  const categoriaId = searchParams.get('categoria_id');
  const keywords = searchParams.get('keywords');

  const [ofertas, setOfertas] = useState<Oferta[]>([]);

  useEffect(() => {
    if (!categoriaId && !keywords) return;

    const fetchOfertas = async () => {
      try {
        const data = await buscarOfertas(categoriaId ?? undefined, keywords ?? undefined);
        setOfertas(data);
      } catch (err) {
        console.error('Error buscando ofertas:', err);
      }
    };

    fetchOfertas();
  }, [categoriaId, keywords]);

  return (
    <main
      className="
        p-4
        grid
        grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
        gap-6
        justify-center
        min-h-screen
        bg-[#1c1f2b]
        text-white
      "
    >
      {ofertas.length === 0 ? (
        <p>No se encontraron ofertas.</p>
      ) : (
        ofertas.map((oferta) => (
          <OfferCard key={oferta.id} data={oferta} />
        ))
      )}
    </main>
  );
}
