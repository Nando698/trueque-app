import { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Button, Stack, Divider, Alert
} from '@mui/material';
import axios from 'axios';
import { Ofrecimiento } from '@/interfaces/Ofrecimiento';
import { aceptarOfrecimiento, obtenerOfrecimientosRecibidos } from '@/connect/ofrecimientos';




export default function OfrecimientosRecibidos() {
    const [ofrecimientos, setOfrecimientos] = useState<Ofrecimiento[]>([]);
    const [mensajeContacto, setMensajeContacto] = useState<string | null>(null);
  
    const fetchOfrecimientos = async () => {
      const data = await obtenerOfrecimientosRecibidos();
      setOfrecimientos(data);
    };
  
    const aceptar = async (id: number) => {
      try {
        const resultado = await aceptarOfrecimiento(id);
        setMensajeContacto(
          `Contacto: ${resultado.contacto.nombre}, ${resultado.contacto.correo}, ${resultado.contacto.telefono}`
        );
        fetchOfrecimientos();
      } catch (error) {
        console.error('Error al aceptar ofrecimiento', error);
      }
    };
  
    useEffect(() => {
      fetchOfrecimientos();
    }, []);
  
    return (
      <Stack spacing={2}>
        <Typography variant="h5">Ofrecimientos recibidos</Typography>
  
        {mensajeContacto && <Alert severity="success">{mensajeContacto}</Alert>}
  
        {ofrecimientos.map((o) => (
          <Card key={o.id}>
            <CardContent>
              <Typography variant="subtitle1">
                <b>Oferta:</b> {o.oferta.titulo}
              </Typography>
              <Typography><b>Mensaje:</b> {o.mensaje || 'Sin mensaje'}</Typography>
              <Typography><b>De:</b> {o.usuario.nombre}</Typography>
              <Typography><b>Estado:</b> {o.estado}</Typography>
              <Divider sx={{ my: 1 }} />
              {o.estado === 'PENDIENTE' && (
                <Button variant="contained" onClick={() => aceptar(o.id)}>
                  Aceptar ofrecimiento
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  }
