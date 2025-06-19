'use client';

import { useState } from 'react';
import { useCategorias } from '@/hooks/useCategorias';
import { useReportes } from '@/hooks/useReportes';
import { validarToken } from '@/connect/auth';
import {
  Box, Container, Typography, Drawer, List, ListItem, ListItemButton,
  ListItemText, AppBar, Toolbar, IconButton, Snackbar, Alert
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ModalGenerico from '@/components/modal';
import CatAdmin from '@/components/catAdmin';
import ReportesAdmin from '@/components/reportesAdmin';
import AdminUsuariosContainer from '@/containers/AdminUsuariosContainer';
import { Categoria } from '@/interfaces/Categoria';
import AdminCategoriasContainer from '@/containers/AdminCategoriasContainer';
import AdminReportesContainer from '@/containers/AdminReportesContainer';

export default function AdminPage() {
  const [seccionActiva, setSeccionActiva] = useState<'usuarios' | 'categorias' | 'reportes'>('usuarios');
  const [sidebarAbierto, setSidebarAbierto] = useState(true);
  const [open, setOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);
  const [errorModal, setErrorModal] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const mostrarSnackbar = (mensaje: string) => {
    setSnackbarMsg(mensaje);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  // Validar token solo una vez
  useState(() => {
    validarToken().then(valido => {
      if (!valido) window.location.href = '/login';
    });
  });

  // Custom hooks para cada sección
  const { categorias, setCategorias } = useCategorias(mostrarSnackbar);
  const { reportes } = useReportes(mostrarSnackbar);

  const manejarConfirmacion = async () => {
    if (!categoriaSeleccionada) return;
    try {
      // Lógica para eliminar la categoría (ya deberías tenerla)
      setCategorias(prev => prev.filter(c => c.id !== categoriaSeleccionada.id));
      setCategoriaSeleccionada(null);
      setOpen(false);
      setErrorModal(null);
    } catch {
      setErrorModal('Error al eliminar la categoría.');
      setOpen(true);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#0d1b2a", minHeight: "100vh", display: "flex" }}>
      {sidebarAbierto && (
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "#1b263b",
              color: "white",
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Admin</Typography>
          </Box>
          <List>
            {['usuarios', 'categorias', 'reportes'].map((sec) => (
              <ListItem disablePadding key={sec}>
                <ListItemButton selected={seccionActiva === sec} onClick={() => setSeccionActiva(sec as any)}>
                  <ListItemText primary={`Gestión de ${sec}`} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#1b263b" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setSidebarAbierto(!sidebarAbierto)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Panel de Administración</Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ py: 4 }}>
          
          {seccionActiva === 'usuarios' && <AdminUsuariosContainer onError={mostrarSnackbar} />}
          {seccionActiva === "categorias" && (<AdminCategoriasContainer onError={mostrarSnackbar} />)}
          {seccionActiva === 'reportes' && <AdminReportesContainer onError={mostrarSnackbar} />}

        </Container>
      </Box>

      <ModalGenerico
        open={open}
        onClose={() => { setOpen(false); setErrorModal(null); setCategoriaSeleccionada(null); }}
        titulo="Confirmar acción"
        contenido={errorModal ? <Typography color="error">{errorModal}</Typography> : "¿Estás seguro que querés continuar?"}
        onConfirm={manejarConfirmacion}
        textoConfirmar="Sí, seguir"
        textoCancelar="No"
        disableConfirm={!!errorModal}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
