"use client";

import { TextField, Button, Typography, Box } from "@mui/material";
import { crearOferta } from "@/connect/ofertas";
import { useState } from "react";



const PublicarOferta: React.FC = () => {
  
   const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await crearOferta(titulo, descripcion, files);
      console.log('Oferta creada:', data);
      setTitulo("");
      setDescripcion("");
      setFiles(null);
    } catch (err) {
      console.error('Error al crear la oferta:', err);
    }
  };
  
  
   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };
  
  
  
  
  
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
        <input hidden accept="image/*" multiple type="file" onChange={handleFileChange}/>
      </Button>

      <TextField
        label="¿Qué te gustaría recibir a cambio?"
        multiline
        rows={2}
        fullWidth
      />

      <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
        Publicar
      </Button>
     
    </Box>
  );
};

export default PublicarOferta;
