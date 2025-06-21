import React from 'react';
import { Box, Card,CardContent, CardMedia, Typography } from '@mui/material';
import { Oferta } from '@/interfaces/Oferta';

interface MiniCardProps {
  oferta: Oferta
}

const MiniCard: React.FC<MiniCardProps> = ({ oferta}) => (
  <Card sx={{
    width: 200,           // ancho fijo
    height: 200,          // alto fijo
    borderRadius: 2,
    boxShadow: 1,
    display: 'flex',      // para usar flex interno
    flexDirection: 'column',
  }}>
    
      {oferta.imagenes.length > 0 ? (
        <CardMedia
          component="img"
          image={oferta.imagenes?.[0]}
          alt={oferta.titulo}
          sx={{
            width: '100%',           
            height: 140,             
            objectFit: 'cover',      
          }}
        />
      ): (
        <Box
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="gray"
            >
              Sin imágenes
            </Box>
      )}
      <CardContent sx={{
          flexGrow: 1,         
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <Typography variant="subtitle1" noWrap>
          {oferta.titulo}
        </Typography>
        {oferta.descripcion && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {oferta.descripcion}
          </Typography>
        )}
      </CardContent>
    
  </Card>
);

export default MiniCard;
