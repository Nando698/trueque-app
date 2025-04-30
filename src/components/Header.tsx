import React from 'react';
import { TextField, Button, Avatar } from '@mui/material';
import BasicMenu from './Menu';
import MultipleSelectCheckmarks from './SelectTag';


const Header: React.FC = () => {
    return (
      <header className="bg-blue-400 border-b border-emerald-700 px-4 py-3 flex flex-col gap-4 sm:gap-5 md:flex-row md:items-center md:justify-between">
        {/* Logo */}
        <h1 className="text-3xl text-white text-center md:text-left font-sans tracking-tight">True? que app!</h1>
  
        {/* Search Form */}
        <form className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
          <MultipleSelectCheckmarks />
          <TextField
            id="outlined-basic"
            label="Buscar..."
            variant="outlined"
            size="small"
            sx={{ backgroundColor: "#5897d6", minWidth: "120px", flexGrow: 1, maxWidth: "300px" }}
          />
          <Button variant="contained">¡Vamos!</Button>
        </form>
  
        {/* User Menu */}
        <div className="flex items-center justify-center md:justify-end gap-3">
          <BasicMenu />
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </div>
      </header>
    )
  }
  
  export default Header
