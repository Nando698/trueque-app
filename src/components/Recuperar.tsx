'use client';

import { cambiarPassword, solicitarCodigoRecuperacion } from "@/connect/auth";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Recuperar: React.FC = () => {
    
const [correo, setCorreo] = useState('');
const [mensaje, setMensaje] = useState('');
const [error, setError] = useState('');
const [codigo, setCodigo] = useState('');
const [nuevaPass, setNuevaPass] = useState('');




const enviarSolicitud = async () => {
    try {
      const data = await solicitarCodigoRecuperacion(correo);
      setMensaje(data.mensaje || 'Código de recuperación generado.');
      setError('');
    } catch {
      
      setError('Error al generar código');
      setMensaje('');
    }
  };
    
    
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await cambiarPassword(correo, codigo, nuevaPass);
      
      window.location.href = '/login';
    } catch {
      setError('Codigo incorrecto');
      setMensaje('');
      
    }
  };
    
    
    
    
    
    
    
    
    
    
    return (
        <Box
        sx={{
          maxWidth: 400,
          mx: 'auto',
          mt: 8,
          p: 4,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Recuperar contraseña
        </Typography>
      
        {/* Paso 1: Enviar código */}
        <TextField
          label="Correo electrónico"
          variant="outlined"
          fullWidth
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          sx={{ mb: 2 }}
        />
      
        <Button variant="contained" fullWidth onClick={enviarSolicitud}>
          Enviar código
        </Button>
      
        {mensaje && <Alert severity="success" sx={{ mt: 2 }}>{mensaje}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      
        {/* Separador visual */}
        <Box sx={{ my: 3, borderTop: '1px solid #ddd' }} />
      
        {/* Paso 2: Cambiar contraseña */}
        <Typography variant="subtitle1" gutterBottom>
          Ingresar código y nueva contraseña
        </Typography>
      
        <TextField
          label="Código"
          variant="outlined"
          fullWidth
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          sx={{ mb: 2 }}
        />
      
        <TextField
          label="Nueva contraseña"
          variant="outlined"
          fullWidth
          type="password"
          value={nuevaPass}
          onChange={(e) => setNuevaPass(e.target.value)}
          sx={{ mb: 2 }}
        />
      
        <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>
          Cambiar contraseña
        </Button>
      </Box>
      
      
    )
}


export default Recuperar;