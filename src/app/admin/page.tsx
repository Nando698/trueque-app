'use client';

import { validarToken } from '@/connect/auth';
import { obtenerUsuarios } from '@/connect/users';
import { Usuario } from '@/interfaces/Usuario';
import { Categoria } from '@/interfaces/Categoria';
import {
  Container, Typography, Box, Paper, Button, List, ListItem, ListItemText, Stack, TextField, Drawer, ListItemButton, IconButton, AppBar, Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { crearCategoria, eliminarCategoria, obtenerCategorias } from '@/connect/categorias';

export default function AdminPage() {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [seccionActiva, setSeccionActiva] = useState<'usuarios' | 'categorias'>('usuarios');
  const [sidebarAbierto, setSidebarAbierto] = useState(true);
  const [nuevaCat, setNuevaCat] = useState('');

  const ITEMS_POR_PAGINA = 5;

  const [categories, setCategories] = useState<Categoria[]>([]);

  useEffect(() => {
    const checkAuthYUsuarios = async () => {
      const valido = await validarToken();
      if (!valido) {
        window.location.href = '/login';
        return;
      }

      try {
        const datos = await obtenerUsuarios();
        setUsers(datos);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
      try {
        const datos = await obtenerCategorias();
        setCategories(datos);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    checkAuthYUsuarios();
  }, []);

  const totalPaginas = Math.ceil(users.length / ITEMS_POR_PAGINA);
  const usuariosVisibles = users.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  return (
    <Box sx={{ backgroundColor: '#0d1b2a', minHeight: '100vh', display: 'flex' }}>
      {sidebarAbierto && (
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 240,
              boxSizing: 'border-box',
              backgroundColor: '#1b263b',
              color: 'white'
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Admin</Typography>
          </Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton selected={seccionActiva === 'usuarios'} onClick={() => setSeccionActiva('usuarios')}>
                <ListItemText primary="Gestión de usuarios" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton selected={seccionActiva === 'categorias'} onClick={() => setSeccionActiva('categorias')}>
                <ListItemText primary="Gestión de categorías" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      )}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#1b263b' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setSidebarAbierto(!sidebarAbierto)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Panel de Administración
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ py: 4 }}>
          {seccionActiva === 'usuarios' && (
            <Box mb={5}>
              <Typography variant="h5" gutterBottom color="white">
                Usuarios
              </Typography>
              <List>
                {usuariosVisibles.map((user: Usuario) => (
                  <Paper key={user.id} sx={{ p: 2, mb: 2 }}>
                    <ListItem disablePadding>
                      <ListItemText
                        primary={`${user.nombre} (${user.correo})`}
                        secondary={`Estado: ${user.estado ? 'Activo' : 'Inactivo'}`}
                      />
                    </ListItem>
                    <Stack direction="row" spacing={2} mt={1}>
                      <Button variant="outlined">Desactivar</Button>
                      <Button variant="outlined" color="error">Eliminar</Button>
                    </Stack>
                  </Paper>
                ))}
              </List>

              <Stack direction="row" justifyContent="center" spacing={2} mt={2}>
                <Button
                  variant="outlined"
                  onClick={() => setPaginaActual(p => Math.max(p - 1, 1))}
                  disabled={paginaActual === 1}
                >
                  Anterior
                </Button>
                <Typography color="white" sx={{ alignSelf: 'center' }}>
                  Página {paginaActual} de {totalPaginas}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))}
                  disabled={paginaActual === totalPaginas}
                >
                  Siguiente
                </Button>
              </Stack>
            </Box>
          )}

          {seccionActiva === 'categorias' && (
            <Box>
              <Typography variant="h5" gutterBottom color="white">
                Categorías
              </Typography>
              <Stack spacing={2} mb={2}>
                {categories.map((cat, index) => (
                  <Paper key={index} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography>{cat.nombre}</Typography>
                    <Button variant="outlined" color="error" onClick={() => {eliminarCategoria(cat.id)}}>Eliminar</Button>
                  </Paper>
                ))}
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField variant="outlined" label="Nueva Categoría" size="small" onChange={(e) => {setNuevaCat(e.target.value)}} />
                <Button variant="contained" onClick={() => {crearCategoria(nuevaCat)}}>Agregar Categoría</Button>
              </Stack>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}
