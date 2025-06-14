'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Paper,
  CircularProgress,
} from '@mui/material';

import Image from 'next/image';
import { validarToken } from '@/connect/auth';
import { obtenerUnaOferta } from '@/connect/ofertas';
import { useParams } from 'next/navigation';
import { Oferta } from '@/interfaces/Oferta';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const OfertaDetalle = () => {
  const [oferta, setOferta] = useState<Oferta | null>(null);
  const [imagenActiva, setImagenActiva] = useState(0);
  const cambiarImagen = (i: number) => setImagenActiva(i);

  const params = useParams();
  const id = Number(params?.id);

  useEffect(() => {
    const checkAuth = async () => {
      const valido = await validarToken();
      if (!valido) {
        window.location.href = '/login';
      }
    };

    checkAuth();

    if (!id || isNaN(id)) return;

    obtenerUnaOferta(id)
      .then(setOferta)
      .catch((error: Error) => {
        console.error('Error al obtener una oferta:', error);
      });
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
      elevation={3}
      sx={{
        maxWidth: 800,
        margin: 'auto',
        padding: 3,
        bgcolor: '#fafafa',
        borderRadius: 2,
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
              style={{ objectFit: 'cover' }}
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
                color: oferta.estado === 'ACTIVO' ? 'green' : 'red',
                fontWeight: 'bold',
                ml: 1,
              }}
            >
              {oferta.estado}
            </Box>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default OfertaDetalle;
