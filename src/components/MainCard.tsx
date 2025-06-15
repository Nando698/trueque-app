'use client';

import { jwtDecode } from "jwt-decode";
import { Categoria } from "@/interfaces/Categoria";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  IconButton,
  MobileStepper,
  Link,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { TokenPayload } from "@/interfaces/TokenPayLoad";
import { borrarOferta } from "@/connect/ofertas";
import { guardarFavorito } from "@/connect/favs";
import Image from "next/image";
import { Oferta } from "@/interfaces/Oferta";
import ModalReporte from '../components/modalReporte';
import { reportarOferta } from "@/connect/reporte";

interface Props {
  data: Oferta;
}

export default function OfferCard({ data }: Props) {
  const [esAdmin, setEsAdmin] = useState(false);
  const soloFecha = data.fechaPublicacion.split("T")[0] ?? "Fecha no disponible";
  const imagenes = data.imagenes ?? [];
  const maxSteps = imagenes.length;
  const [activeStep, setActiveStep] = useState(0);
  const [modalAbierto, setModalAbierto] = useState(false);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode<TokenPayload>(token);
        setEsAdmin(decoded.rol === "ADMIN");
      }
    }
  }, []);

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps);
  };


  const handleReportar = async (motivo: string) => {
    try {
      await reportarOferta(data.id, motivo);
    } catch (e) {
      console.error('Error al reportar:', e);
      alert('No se pudo enviar el reporte');
    } finally {
      setModalAbierto(false);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        mt: 5,
      }}
    >
      {/* Slider de imágenes */}
      <Box position="relative" width="100%" height={180} bgcolor="#fff">
        {imagenes.length > 0 ? (
          <>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={imagenes[activeStep]}
                alt={`Imagen ${activeStep + 1}`}
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </Box>

            {maxSteps > 1 && (
              <>
                <IconButton
                  onClick={handleBack}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    transform: "translateY(-50%)",
                    color: "#000",
                  }}
                >
                  <ArrowBackIos fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={handleNext}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: 0,
                    transform: "translateY(-50%)",
                    color: "#000",
                  }}
                >
                  <ArrowForwardIos fontSize="small" />
                </IconButton>
              </>
            )}

            <MobileStepper
              variant="dots"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={null}
              backButton={null}
              sx={{ justifyContent: "center" }}
            />
          </>
        ) : (
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
      </Box>

      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {data.titulo}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {data.descripcion}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mt={1}
        >
          Categoría: {data.categoria.nombre}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Publicado: {soloFecha}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "center", mt: "auto", mb: 2 }}>
        <Button size="small" component={Link} href={`/publicacion/${data.id}`}>
          Ver más
        </Button>
        <Button size="small" onClick={() => guardarFavorito(data.id)}>
          Guardar
        </Button>
        {esAdmin && (
          <Button
            color="error"
            size="small"
            onClick={() => borrarOferta(data.id)}
          >
            Eliminar
          </Button>
          
        )}

    <Button size="small" component={Link}  onClick={() => setModalAbierto(true)}>
          Reportar
        </Button>
      </CardActions>
      <ModalReporte
  open={modalAbierto}
  onClose={() => setModalAbierto(false)}
  onConfirm={handleReportar}
/>
    </Card>
  );
}
