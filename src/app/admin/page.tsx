'use client';

import { validarToken } from '@/connect/auth';
import { obtenerUsuariosPaginado } from '@/connect/users';
import { Usuario } from '@/interfaces/Usuario';
import { Categoria } from '@/interfaces/Categoria';
import {
  Container, Typography, Box, List, ListItem, ListItemText,  Drawer, ListItemButton, IconButton, AppBar, Toolbar,
  Link,
  Alert,
  Snackbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { crearCategoria, eliminarCategoria, obtenerCategorias } from '@/connect/categorias';
import ModalGenerico from '@/components/modal';
import { Reporte } from '@/interfaces/reporte';
import { obtenerReportes } from '@/connect/reporte';
import CatAdmin from '@/components/catAdmin';
import ReportesAdmin from '@/components/reportesAdmin';
import UsuariosAdmin from '@/components/usuariosAdmin';



export default function AdminPage() {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [seccionActiva, setSeccionActiva] = useState<'usuarios' | 'categorias' | 'reportes'>('usuarios');
  const [sidebarAbierto, setSidebarAbierto] = useState(true);
  const [open, setOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);
  const [errorModal, setErrorModal] = useState<string | null>(null);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const itemsPorPagina = 5;

  const [categories, setCategories] = useState<Categoria[]>([]);
  const [reportes, setReportes] = useState<Reporte[]>([]);

  const manejarConfirmacion = async () => {
    if (!categoriaSeleccionada) return;

    try {
      await eliminarCategoria(categoriaSeleccionada.id);
      setCategories((prev) =>
        prev.filter((c) => c.id !== categoriaSeleccionada.id)
      );
      setCategoriaSeleccionada(null);
      setOpen(false);
      setErrorModal(null);
    } catch (error: any) {
      const msg = 'Error al eliminar la categoría. Asegurate de que no tenga ofertas asociadas.';
      setErrorModal(msg);
      setOpen(true)
    }
  };




  useEffect(() => {
    const checkAuthYDatos = async () => {
      const valido = await validarToken();
      if (!valido) {
        window.location.href = '/login';
        return;
      }

      try {
        const cats = await obtenerCategorias();
        setCategories(cats);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }

      try {
        const rep = await obtenerReportes();
        setReportes(rep.data);
      } catch (error) {
        console.error('Error al obtener reportes:', error);
      }
    };

    checkAuthYDatos();
  }, []);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await obtenerUsuariosPaginado(paginaActual, itemsPorPagina);
        setUsers(res.data);
        setTotalPaginas(Math.ceil(res.total / itemsPorPagina));
      } catch (error:any) {
        
        mostrarSnackbar(`Error al obtener usuarios, codigo: ${error.response.status}`);
      }
    };

    fetchUsuarios();
  }, [paginaActual]);


  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');


  const mostrarSnackbar = (mensaje: string) => {
      setSnackbarMsg(mensaje);
      setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
  };



  return (
    <Box
      sx={{ backgroundColor: "#0d1b2a", minHeight: "100vh", display: "flex" }}
    >
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
            <ListItem disablePadding>
              <ListItemButton
                selected={seccionActiva === "usuarios"}
                onClick={() => setSeccionActiva("usuarios")}
              >
                <ListItemText primary="Gestión de usuarios" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={seccionActiva === "categorias"}
                onClick={() => setSeccionActiva("categorias")}
              >
                <ListItemText primary="Gestión de categorías" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={seccionActiva === "reportes"}
                onClick={() => setSeccionActiva("reportes")}
              >
                <ListItemText primary="Ofertas reportadas" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      )}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#1b263b" }}>
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
            <UsuariosAdmin
              usuarios={users}
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              setPaginaActual={setPaginaActual}
            />
          )}


          {seccionActiva === "categorias" && (
            <CatAdmin
              categorias={categories}
              onEliminar={(cat) => {
                setCategoriaSeleccionada(cat);
                setOpen(true);
              }}
              onCrear={async (nombre) => {
                await crearCategoria(nombre);
                const nuevasCats = await obtenerCategorias();
                setCategories(nuevasCats);
              }}
            />
          )}

          {seccionActiva === "reportes" && <ReportesAdmin reportes={reportes} />}

        </Container>
      </Box>
      <ModalGenerico
        open={open}
        onClose={() => {
          setOpen(false);
          setErrorModal(null);
          setCategoriaSeleccionada(null);
        }}
        titulo="Confirmar acción"
        contenido={
          errorModal ? (
            <Typography color="error">{errorModal}</Typography>
          ) : (
            "¿Estás seguro que querés continuar?"
          )
        }
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
