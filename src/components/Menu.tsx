// components/BasicMenu.tsx

'use client'; // si usás Next.js App Router

import React from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import Link from 'next/link';

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
        <Link href={'/publicar'}><MenuItem onClick={handleClose}><p className="font-bold">Publicar</p></MenuItem></Link>
        <Link href={'/ofertas'}><MenuItem onClick={handleClose}>Navegar ofertas</MenuItem></Link>
        <Link href={'/faq'}><MenuItem onClick={handleClose}>F.A.Q.</MenuItem></Link>
        <Link href={'/contacto'}><MenuItem onClick={handleClose}>Contacto</MenuItem></Link>
      </Menu>
    </div>
  );
};

export default BasicMenu;





