'use client';

import React, { useEffect, useState } from 'react';
import { TextField, Button, Avatar } from '@mui/material';
import BasicMenu from './Menu';
import MultipleSelectCheckmarks from './SelectTag';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const showSearch = pathname !== '/login' && pathname !== '/register' && pathname !== '/recuperar';

  const [keywords, setKeywords] = useState('');
  const [categorias, setCategorias] = useState<string[]>([]); 
  const [nombreUsuario, setNombreUsuario] = useState<string>('');;


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();

    if (categorias.length > 0) {
      query.set('categoria_id', categorias.join(','));
    }

    if (keywords.trim()) {
      query.set('keywords', keywords.trim());
    }

    
    router.push(`/ofertas/buscar?${query.toString()}`);
  };

  useEffect( () => {
    const nombre = localStorage.getItem("nombre");
    if(nombre){
      setNombreUsuario(nombre)
    }

  },[]);



  return (
    <header className="bg-blue-400 border-b border-emerald-700 px-4 py-3 flex flex-col gap-4 sm:gap-5 md:flex-row md:items-center md:justify-between">
      <Link href={'/'}><h1 className="text-3xl text-white text-center md:text-left font-sans tracking-tight max-w-60">True? que app!</h1></Link>

      {showSearch && (
        <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
         <MultipleSelectCheckmarks onChange={(selected) => setCategorias(selected)} />

          <TextField
            id="outlined-basic"
            label="Buscar..."
            variant="outlined"
            size="small"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            sx={{
              backgroundColor: "#5897d6",
              minWidth: "120px",
              flexGrow: 1,
              maxWidth: "300px",
              marginLeft: { sm: '8px' },
            }}
          />
          <Button variant="contained" type="submit">Buscar</Button>
        </form>
      )}  
    {showSearch && (
      <div className="flex items-center justify-center md:justify-end gap-3">
        <BasicMenu />
        <p>Bienvenido {nombreUsuario}</p>
        <Avatar alt="Remy Sharp" />
      </div>

      )   }

    
    </header>
  );
};

export default Header;
