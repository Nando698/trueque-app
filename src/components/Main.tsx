import React from 'react';
import { mockData } from '@/utils/mockData';  // Solo para desarrollo


import { renderUtils } from '@/utils/render';

const Main: React.FC = () => {
  const { ofertas } = mockData;

  return (
    <main className="bg-gray-800 min-h-screen grid">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    
        {renderUtils.renderizarOfertas(ofertas)}
        
    </div>
      
      
      

    </main>
  );
};



export default Main;