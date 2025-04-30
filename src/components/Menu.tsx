// components/BasicMenu.tsx

'use client'; // si usás Next.js App Router

import React from 'react';
import { Menu, MenuItem, Button } from '@mui/material';

const BasicMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
      >
        <p className="font-black">Comencemos!</p>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><p className="font-bold">Publicar</p></MenuItem>
        <MenuItem onClick={handleClose}>Navegar ofertas</MenuItem>
        <MenuItem onClick={handleClose}>Contacto</MenuItem>
        <MenuItem onClick={handleClose}>Preguntas frecuentes</MenuItem>
      </Menu>
    </div>
  );
};

export default BasicMenu;





