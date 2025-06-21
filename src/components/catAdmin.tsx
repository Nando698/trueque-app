'use client';

import { Categoria } from '@/interfaces/Categoria';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

interface Props {
  categorias: Categoria[];
  onEliminar: (categoria: Categoria) => void;
  onCrear: (nombre: string) => void;
}

export default function CatAdmin({ categorias, onEliminar, onCrear }: Props) {
  const [nuevaCat, setNuevaCat] = useState('');

  return (
    <>
      <Typography variant="h5" gutterBottom color="white">
        Categorías
      </Typography>

      <Stack spacing={2} mb={2}>
        {categorias.map((cat) => (
          <Paper
            key={cat.id}
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography>{cat.nombre}</Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={() => onEliminar(cat)}
            >
              Eliminar
            </Button>
          </Paper>
        ))}
      </Stack>

      <Stack direction="row" spacing={2}>
        <TextField
          variant="outlined"
          label="Nueva Categoría"
          size="small"
          value={nuevaCat}
          onChange={(e) => setNuevaCat(e.target.value)}
          sx={{ bgcolor: 'white' }}
        />
        <Button
          variant="contained"
          onClick={() => {
            if (nuevaCat.trim() !== '') {
              onCrear(nuevaCat.trim());
              setNuevaCat('');
            }
          }}
        >
          Agregar Categoría
        </Button>
      </Stack>
    </>
  );
}
