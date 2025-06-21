'use client';
import { useEffect, useState } from 'react';
import {
  Alert, CircularProgress, Paper, Typography,
  Stack, Button
} from '@mui/material';
import { obtenerMensajesContacto, eliminarMensajeContacto } from '@/connect/contacto';
import { Contacto } from '@/interfaces/Contacto';

export default function AdminContactosContainer() {
  const [mensajes, setMensajes] = useState<Contacto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarMensajes();
  }, []);

  const cargarMensajes = async () => {
    try {
      const data = await obtenerMensajesContacto();
      setMensajes(data);
    } catch {
      setError('Error al cargar mensajes');
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id: number) => {
    try {
      await eliminarMensajeContacto(id);
      setMensajes(prev => prev.filter(m => m.id !== id));
    } catch{
      setError('Error al eliminar el mensaje');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Stack spacing={2}>
      {mensajes.map((m) => {
        const soloFecha = m.fechaEnvio?.split("T")[0] ?? "Fecha no disponible";
        return (
          <Paper key={m.id} sx={{ p: 2 }}>
            <Typography><b>Nombre:</b> {m.nombre}</Typography>
            <Typography><b>Correo:</b> {m.correo}</Typography>
            <Typography><b>Mensaje:</b> {m.mensaje}</Typography>
            <Typography variant="caption">Enviado el: {soloFecha}</Typography>
            <Button
              onClick={() => handleEliminar(m.id)}
              variant="outlined"
              color="error"
              sx={{ mt: 1 , ml: 4 }}
            >
              Eliminar
            </Button>
          </Paper>
        );
      })}
    </Stack>
  );
}
