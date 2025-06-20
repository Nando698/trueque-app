'use client';

import React, { useEffect, useState } from 'react';
import { obtenerOfertas } from '../connect/ofertas';
import { validarToken } from '@/connect/auth';
import OfferCard from '@/components/MainCard';
import { Oferta } from '@/interfaces/Oferta';

const Main: React.FC = () => {
  const [ofertas, setOfertas] = useState<Oferta[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const valido = await validarToken();
      if (!valido) {
        window.location.href = '/login';
        return;
      }

      try {
        const data = await obtenerOfertas();
        console.log("Ofertas:", data);

        const activas = data.filter((oferta: Oferta) => oferta.estado === 'ACTIVA');
        console.log("Ofertas activas:", activas);
        setOfertas(activas);
      } catch (error) {
        console.error('Error al obtener ofertas:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="bg-gray-800 min-h-screen grid px-6 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ofertas.length === 0 ? (
          <p className="text-white">No hay ofertas activas disponibles.</p>
        ) : (
          ofertas.map((oferta) => (
            <OfferCard key={oferta.id} data={oferta} actions={true} />
          ))
        )}
      </div>
    </main>
  );
};

export default Main;
