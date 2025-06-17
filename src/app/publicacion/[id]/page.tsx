'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Paper,
  CircularProgress,
  Button,
} from '@mui/material';

import Image from 'next/image';
import { validarToken } from '@/connect/auth';
import { despausarOferta, finalizarOferta, obtenerUnaOferta, pausarOferta } from '@/connect/ofertas';
import { useParams } from 'next/navigation';
import { Oferta } from '@/interfaces/Oferta';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { jwtDecode } from "jwt-decode";
import { TokenPayload } from '@/interfaces/TokenPayLoad';

const OfertaDetalle = () => {
  const [oferta, setOferta] = useState<Oferta | null>(null);
  const [imagenActiva, setImagenActiva] = useState(0);
  const cambiarImagen = (i: number) => setImagenActiva(i);
  const [esPropia, setEsPropia] = useState(false);

  const params = useParams();
  const id = Number(params?.id);

  const estadoColor: Record<string, string> = {
    ACTIVA: 'green',
    PAUSADA: 'orange',
    FINALIZADA: 'red',
  };

  useEffect(() => {
    const cargarDatos = async () => {
      const valido = await validarToken();
      if (!valido) {
        window.location.href = '/login';
        return;
      }

      if (!id || isNaN(id)) return;

      const token = localStorage.getItem("token");
      const decoded = token ? jwtDecode<TokenPayload>(token) : null;

      try {
        const ofertaCargada = await obtenerUnaOferta(id);
        setOferta(ofertaCargada);
        if (decoded && ofertaCargada.usuario.id === decoded.sub) {
          setEsPropia(true);
        }
      } catch (error) {
        console.error('Error al obtener una oferta:', error);
      }
    };

    cargarDatos();
  }, [id]);

  if (!oferta) {
    return (
      <Box
        sx={{
          height: '50vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper
      elevation={6}
      sx={{
    maxWidth: 960,
    margin: 'auto',
    padding: { xs: 2, md: 4 },
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
  }}
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: 'black' }}
      >
        {oferta.titulo}
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {/* Imagen principal y miniaturas */}
        <Box
          sx={{
            flex: 1,
            minWidth: 280,
            bgcolor: 'white',
            borderRadius: 2,
            p: 2,
            boxShadow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 240,
              borderRadius: 2,
              overflow: 'hidden',
              mb: 2,
            }}
          >
            <Image
              src={oferta.imagenes[imagenActiva]}
              alt={`Imagen ${imagenActiva + 1}`}
              fill
              style={{ objectFit: 'contain' }}
            />

            {imagenActiva > 0 && (
              <Box
                onClick={() => setImagenActiva(imagenActiva - 1)}
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: 'white',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  borderRadius: '50%',
                  p: '4px',
                }}
              >
                <ArrowBackIosNewIcon />
              </Box>
            )}

            {imagenActiva < oferta.imagenes.length - 1 && (
              <Box
                onClick={() => setImagenActiva(imagenActiva + 1)}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: 'white',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  borderRadius: '50%',
                  p: '4px',
                }}
              >
                <ArrowForwardIosIcon />
              </Box>
            )}
          </Box>

          {oferta.imagenes.length > 1 && (
            <ImageList cols={3} gap={8} sx={{ width: '100%' }}>
              {oferta.imagenes.map((img, i) => (
                <ImageListItem
                  key={i}
                  sx={{
                    cursor: 'pointer',
                    position: 'relative',
                    height: 60,
                    opacity: i === imagenActiva ? 1 : 0.6,
                    transition: 'opacity 0.3s',
                  }}
                  onClick={() => cambiarImagen(i)}
                >
                  <Image
                    src={img}
                    alt={`Miniatura ${i + 1}`}
                    fill
                    style={{
                      borderRadius: 6,
                      border:
                        i === imagenActiva
                          ? '3px solid #1976d2'
                          : '1px solid #ccc',
                      objectFit: 'cover',
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Box>

        {/* Detalles */}
        <Box
          sx={{
            flex: 1,
            minWidth: 280,
            bgcolor: 'white',
            borderRadius: 2,
            p: 3,
            boxShadow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Descripción:
            </Typography>
            <Typography variant="body1" paragraph>
              {oferta.descripcion}
            </Typography>

            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Productos a intercambiar:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              {oferta.cambio}
            </Box>

            <Typography variant="body2" gutterBottom>
              <strong>Categoría:</strong> {oferta.categoria.nombre}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Fecha de publicación:</strong>{' '}
              {new Date(oferta.fechaPublicacion).toLocaleDateString('es-AR')}
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mt: 2 }}>
            <strong>Estado:</strong>{' '}
            <Box
              component="span"
              sx={{
                color: estadoColor[oferta.estado],
                fontWeight: 'bold',
                ml: 1,
              }}
            >
              {oferta.estado}
            </Box>
          </Typography>
          {esPropia && (
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              {oferta.estado === 'ACTIVA' && (
                <Button onClick={() => pausarOferta(oferta.id)}>Pausar</Button>
              )}
              {oferta.estado === 'PAUSADA' && (
                <Button onClick={() => despausarOferta(oferta.id)}>Despausar</Button>
              )}

              <Button onClick={() => finalizarOferta(oferta.id)}>Finalizar</Button>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default OfertaDetalle;
