"use client";

import { TextField, Button, Typography, Box } from "@mui/material";

const PublicarOferta: React.FC = () => {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 600,
        p: 2,
      }}
    >
      <Typography variant="h5" sx={{color:"black"}}>Publicar nueva oferta</Typography>

      <TextField label="Título del elemento" required fullWidth />

      <TextField label="Descripción" multiline rows={4} required fullWidth />

      {/* cambiar por lógica para levantar imágenes del DB */}

      <Button variant="outlined" component="label">
        Subir imágenes
        <input hidden accept="image/*" multiple type="file" />
      </Button>

      <TextField
        label="¿Qué te gustaría recibir a cambio?"
        multiline
        rows={2}
        fullWidth
      />

      <Button variant="contained" color="primary" type="submit">
        Publicar
      </Button>
    </Box>
  );
};

export default PublicarOferta;
