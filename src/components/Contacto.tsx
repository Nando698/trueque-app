"use client";

import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { enviarMensajeContacto } from "@/connect/contacto";
import { obtenerUsuario } from "@/connect/users";
import { validarToken } from "@/connect/auth";
import { Usuario } from "@/interfaces/Usuario";

interface ContactoForm {
  nombre: string;
  correo: string;
  mensaje: string;
}

export default function ContactoPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactoForm>();
  const [perfil, setPerfil] = useState<Usuario | null>(null);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const valido = await validarToken();
      if (!valido) {
        window.location.href = "/login";
        return;
      }

      const user = await obtenerUsuario();
      setPerfil(user);
      setValue("nombre", user.nombre);
      setValue("correo", user.correo);
    };

    checkAuth();
  }, [setValue]);

  const onSubmit = async (data: ContactoForm) => {
    try {
      await enviarMensajeContacto(data.nombre, data.correo, data.mensaje);
      setEnviado(true);
      setError(false);
      reset({ mensaje: "" });
    } catch (err) {
      console.error("Error al enviar el mensaje:", err);
      setError(true);
      setEnviado(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 8,
        p: 3,
        backgroundColor: "white",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" sx={{ color: "black" }} gutterBottom>
        Contacto
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          {...register("nombre", { required: "Este campo es obligatorio" })}
          error={!!errors.nombre}
          helperText={errors.nombre?.message}
          margin="normal"
          disabled 
        />

        <TextField
          fullWidth
          type="email"
          {...register("correo", {
            required: "Este campo es obligatorio",
            pattern: { value: /^\S+@\S+$/i, message: "Correo inválido" },
          })}
          error={!!errors.correo}
          helperText={errors.correo?.message}
          margin="normal"
          disabled
        />

        <TextField
          fullWidth
          label="Mensaje"
          multiline
          rows={4}
          {...register("mensaje", { required: "Este campo es obligatorio" })}
          error={!!errors.mensaje}
          helperText={errors.mensaje?.message}
          margin="normal"
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Enviar
        </Button>

        {enviado && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Mensaje enviado correctamente
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Error al enviar el mensaje
          </Alert>
        )}
      </form>
    </Box>
  );
}
