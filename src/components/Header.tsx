import React from 'react';
import { TextField, Button, Avatar } from '@mui/material';
import BasicMenu from './Menu';
import MultipleSelectCheckmarks from './SelectTag';


const Header: React.FC = () => {
  return (
    <header className="bg-blue-400 border-b border-emerald-700 px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      
      {/* Logo */}
      <h1 className="text-3xl text-white text-center md:text-left font-sans tracking-tight">True? que app!</h1>

      {/* Navegación */}

      
      
        <form action="" className="flex flex-row items-center gap-2">
          <MultipleSelectCheckmarks />
          <TextField  id="outlined-basic" label="Buscar..." variant="outlined" size='small' sx={{ backgroundColor: "#5897d6"}} />
          <Button variant="contained">¡Vamos!</Button>
        </form>
    
    
        <BasicMenu />
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
     

    </header>
  );
};

export default Header;
