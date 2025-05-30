'use client'
import React from 'react';

import { useEffect, useState } from 'react'
import { obtenerOfertas } from '../connect/ofertas'

import { renderUtils } from '@/utils/render';

const Main: React.FC = () => {
  const [ofertas, setOfertas] = useState([])


  useEffect(() => {
    obtenerOfertas()
      .then(setOfertas)
      .catch((error: Error) => {
        console.error('Error al obtener ofertas:', error)
      })
  }, [])

  return (
    <main className="bg-gray-800 min-h-screen grid">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 ">
    
        {renderUtils.renderizarOfertas(ofertas)}
        
    </div>
      
      
      

    </main>
  );
};

export default Main;