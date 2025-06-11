
'use client';

import React, { useState } from 'react';
import { Box, Typography, ImageList, ImageListItem, Paper } from '@mui/material';

const PublicacionDetalle = () => {
  const publicacion = {
    titulo: 'Bicicleta de montaña en buen estado',
    descripcion: 'Vendo mi celular Samsung, tiene 64GB de almacenamiento y lo quiero cambiar porque me conseguí uno mejor.',
    imagenes: [
      '../images/1.png',
      '../images/1.png',
      '../images/1.png',
    ],
    productosIntercambio: [
      'Celular Samsung Galaxy S21',
      'Pelota de fútbol',
      'Tablet',
    ],
    categoria: 'Tecnología',
    fechaPublicacion: '2025-06-05',
    estado: 'ACTIVO',
  };

  const [imagenActiva, setImagenActiva] = useState(0);

  const cambiarImagen = (index: number) => {
    setImagenActiva(index);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 800,
        margin: 'auto auto',
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
        {publicacion.titulo}
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {/* Imagen y miniaturas */}
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
            component="img"
            src={publicacion.imagenes[imagenActiva]}
            alt={`Imagen ${imagenActiva + 1}`}
            sx={{ width: '100%', borderRadius: 2, mb: 2, objectFit: 'cover' }}
          />

          <ImageList cols={3} gap={8} sx={{ width: '100%' }}>
            {publicacion.imagenes.map((img, i) => (
              <ImageListItem key={i} sx={{ cursor: 'pointer' }} onClick={() => cambiarImagen(i)}>
                <img
                  src={img}
                  alt={`Miniatura ${i + 1}`}
                  loading="lazy"
                  style={{
                    borderRadius: 6,
                    border: i === imagenActiva ? '3px solid #1976d2' : '1px solid #ccc',
                    width: '100%',
                    height: '60px',
                    objectFit: 'cover',
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
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
              {publicacion.descripcion}
            </Typography>

            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Productos a intercambiar:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              {publicacion.productosIntercambio.map((prod, i) => (
                <li key={i}>
                  <Typography variant="body1">{prod}</Typography>
                </li>
              ))}
            </Box>

            <Typography variant="body2" gutterBottom>
              <strong>Categoría:</strong> {publicacion.categoria}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Fecha de publicación:</strong> {publicacion.fechaPublicacion}
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mt: 2 }}>
            <strong>Estado:</strong>{' '}
            <Box
              component="span"
              sx={{
                color: publicacion.estado === 'ACTIVO' ? 'green' : 'red',
                fontWeight: 'bold',
                ml: 1,
              }}
            >
              {publicacion.estado}
            </Box>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default PublicacionDetalle;