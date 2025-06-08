"use client";

import { TextField, Button, Typography, Box, Select, MenuItem } from "@mui/material";
import { crearOferta } from "@/connect/ofertas";
import { useEffect, useState } from "react";
import { obtenerCategorias } from "@/connect/categorias";
import { Categoria } from "@/interfaces/Categoria";
import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "@/interfaces/TokenPayLoad";

const token = localStorage.getItem('token');
let  usId:number;
if(token){

    const decoded = jwtDecode<TokenPayload>(token);
     usId = decoded.sub;
  }


const PublicarOferta: React.FC = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cambio, setCambio] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState(0);
  
  
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await crearOferta(
        titulo,
        descripcion,
        cambio,
        files,
        categoria,
        "ACTIVA",
        usId
      );
      console.log("Oferta creada:", data);
      setTitulo("");
      setDescripcion("");
      setFiles(null);
    } catch (err) {
      console.error("Error al crear la oferta:", err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerCategorias();
        setCategorias(data);
      } catch (err) {
        console.error("Error al obtener categorias desde publicar.tsx", err);
      }
    };

    fetchData()
  }, []);

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
      <Typography variant="h5" sx={{ color: "black" }}>
        Publicar nueva oferta
      </Typography>

      <TextField
        label="Título del elemento"
        required
        fullWidth
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <TextField
        label="Descripción"
        multiline
        rows={4}
        required
        fullWidth
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <Select
        labelId="categorias"
        id="demo-simple-select"
        value={categoria}
        label="Categoria"
        onChange={(e) => setCategoria(e.target.value)}
      >

      {categorias.map((categoria) => {
  
  return (
    <MenuItem key={categoria.id} value={categoria.id}>
      {categoria.nombre}
    </MenuItem>
  );
})}



      </Select>

      <Button variant="outlined" component="label">
        Subir imágenes
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={handleFileChange}
        />
      </Button>

      <TextField
        label="¿Qué te gustaría recibir a cambio?"
        multiline
        rows={2}
        fullWidth
        value={cambio}
        onChange={(e) => setCambio(e.target.value)}
      />

      <Button variant="contained" color="primary" type="submit">
        Publicar
      </Button>
    </Box>
  );
};

export default PublicarOferta;
