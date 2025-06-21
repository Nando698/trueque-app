"use client";

import {
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { crearOferta } from "@/connect/ofertas";
import { useEffect, useState } from "react";
import { obtenerCategorias } from "@/connect/categorias";
import { Categoria } from "@/interfaces/Categoria";
import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "@/interfaces/TokenPayLoad";
import { Close } from "@mui/icons-material";
import Image from 'next/image';

const PublicarOferta: React.FC = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cambio, setCambio] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState(0);
  const [userId, setUserId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userId === null) {
      console.error("Usuario no identificado");
      return;
    }

    try {
      const data = await crearOferta(
        titulo,
        descripcion,
        cambio,
        files,
        categoria,
        "ACTIVA",
        userId
      );
      console.log("Oferta creada:", data);
      setTitulo("");
      setDescripcion("");
      setFiles(null);
      window.location.href = "/";
    } catch (err) {
      console.error("Error al crear la oferta:", err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const removeImage = (indexToRemove: number) => {
    if (!files) return;

    const dt = new DataTransfer();
    Array.from(files).forEach((file, index) => {
      if (index !== indexToRemove) {
        dt.items.add(file);
      }
    });

    setFiles(dt.files);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
      setUserId(decoded.sub);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerCategorias();
        setCategorias(data);
      } catch (err) {
        console.error("Error al obtener categorias desde publicar.tsx", err);
      }
    };
    fetchData();
  }, []);

  return (
    <Box display="flex" height="100vh" p={2} sx={{ backgroundColor: "white" }}>
      {/* Sección de formulario */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pr: 2,
          overflowY: "auto",
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
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          {categorias.map((categoria) => (
            <MenuItem key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </MenuItem>
          ))}
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

        {/* Contador de imagenes seleccionadas */}

        {files && files.length > 0 && (
          <Typography variant="body2" color="textSecondary">
            {files.length} imagen{files.length > 1 ? "es" : ""} seleccionada
            {files.length > 1 ? "s" : ""} (máximo 3)
          </Typography>
        )}

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

      {/* Sección de Vista Previa de imagenes */}
      <Box
        sx={{
          flex: 1,
          maxHeight: "100%",
          overflowY: "auto",
          borderLeft: "1px solid #ddd",
          pl: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, color: "black" }}>
          Vista previa de imagenes
        </Typography>

        {files && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {Array.from(files).map((file, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 150,
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => removeImage(index)}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    zIndex: 1,
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  fill
                  style={{ objectFit: 'contain' }}
                  unoptimized
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );

}

export default PublicarOferta;

