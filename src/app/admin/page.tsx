"use client";

import { useState, useEffect } from "react";
import { validarToken } from "@/connect/auth";
import {
  Box,
  Container,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdminUsuariosContainer from "@/containers/AdminUsuariosContainer";
import AdminCategoriasContainer from "@/containers/AdminCategoriasContainer";
import AdminReportesContainer from "@/containers/AdminReportesContainer";
import AdminContactosContainer from "@/containers/AdminContactosContainer";

export default function AdminPage() {
  type Seccion =
    | "usuarios"
    | "publicaciones"
    | "categorias"
    | "reportes"
    | "contacto";
  const secciones: Seccion[] = [
    "usuarios",
    "categorias",
    "reportes",
    "contacto",
  ];

  const [seccionActiva, setSeccionActiva] = useState<Seccion>("usuarios");
  const [sidebarAbierto, setSidebarAbierto] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState<string>("");

  const mostrarSnackbar = (mensaje: string) => {
    setSnackbarMsg(mensaje);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  useEffect(() => {
    validarToken().then((valido) => {
      if (!valido) window.location.href = "/login";
    });
  }, []);

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
            {secciones.map((sec) => (
              <ListItem disablePadding key={sec}>
                <ListItemButton
                  selected={seccionActiva === sec}
                  onClick={() => setSeccionActiva(sec)}
                >
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
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setSidebarAbierto(!sidebarAbierto)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Panel de Administración
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ py: 4 }}>
          {seccionActiva === "usuarios" && (
            <AdminUsuariosContainer onError={mostrarSnackbar} />
          )}
          {seccionActiva === "categorias" && (
            <AdminCategoriasContainer onError={mostrarSnackbar} />
          )}
          {seccionActiva === "reportes" && (
            <AdminReportesContainer onError={mostrarSnackbar} />
          )}
          {seccionActiva === "contacto" && <AdminContactosContainer />}
        </Container>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
