

'use client'; 

import React, { useEffect, useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import Link from 'next/link';
import { logOut } from '@/connect/auth';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '@/interfaces/TokenPayLoad';

const BasicMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [esAdmin, setEsAdmin] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

   useEffect(() => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode<TokenPayload>(token);
          setEsAdmin(decoded.rol === "ADMIN");
        }
      }
    }, []);




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
        <p className="font-black">Menu</p>
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
        <Link href={'/faq'}><MenuItem onClick={handleClose}>F.A.Q.</MenuItem></Link>
        <Link href={'/perfil'}><MenuItem onClick={handleClose}>Mi perfil</MenuItem></Link>
        {esAdmin && (<Link href={'/admin'}><MenuItem onClick={handleClose}>Panel de control</MenuItem></Link>)}
        <Link href={'/login'}><MenuItem onClick={logOut}>Logout</MenuItem></Link>
      </Menu>
    </div>
  );
};

export default BasicMenu;







