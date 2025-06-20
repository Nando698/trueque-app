"use client";

import OfferCard from "../../components/MainCard";
import { obtenerFavoritos } from "@/connect/favs";
import { obtenerOfertasPropias } from "@/connect/ofertas";
import { obtenerUsuario } from "@/connect/users";
import { Oferta } from "@/interfaces/Oferta";
import { TokenPayload } from "@/interfaces/TokenPayLoad";
import { Usuario } from "@/interfaces/Usuario";
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Divider,
  Link,
  Button,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { aceptarOfrecimiento, obtenerOfrecimientosEnviados, obtenerOfrecimientosRecibidos, rechazarOfrecimiento } from '@/connect/ofrecimientos';
import { Ofrecimiento } from '@/interfaces/Ofrecimiento';



const Perfil: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [ofertasPropias, setOfertasPropias] = useState<Oferta[] | null>(null);
  const [favoritos, setFavoritos] = useState<Oferta[] | null>(null);
  const [perfil, setPerfil] = useState<Usuario | null>(null);
  const [pausadas, setPausadas] = useState<Oferta[] | null>(null);
  const [enviados, setEnviados] = useState<Ofrecimiento[] | null>(null);
  const [ofrecimientosRecibidos, setOfrecimientosRecibidos] = useState<Ofrecimiento[] | null>(null);


  const scrollRef1 = useRef<HTMLDivElement>(null!);
  const scrollRef2 = useRef<HTMLDivElement>(null!);
  const scrollRef3 = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode<TokenPayload>(token);
    const id = decoded.sub;
    setUserId(id);


    obtenerOfrecimientosRecibidos().then((ofrecimientos) => {ofrecimientos.filter(o => o.estado !== 'PENDIENTE')});


    obtenerOfrecimientosEnviados().then(setEnviados);
    obtenerUsuario(id).then(setPerfil);
    obtenerOfertasPropias(id, "ACTIVA").then(setOfertasPropias);
    obtenerOfertasPropias(id, "PAUSADA").then(setPausadas);
    obtenerFavoritos().then(({ data }) => {
      setFavoritos(data);


    });
  }, []);

  const scroll = (ref: React.RefObject<HTMLDivElement>, dir: "left" | "right") => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const offset = dir === "left" ? -clientWidth : clientWidth;
      ref.current.scrollTo({ left: scrollLeft + offset, behavior: "smooth" });
    }
  };


  const handleAceptar = async (id: number) => {
    try {
      const data = await aceptarOfrecimiento(id);
      setOfrecimientosRecibidos(prev => prev?.filter(ofr => ofr.id !== id) || []);
      console.log(ofrecimientosRecibidos?.[0].mensaje)
    } catch (err) {
      console.error("Error al aceptar:", err);
    }
  };
  
  const handleRechazar = async (id: number) => {
    try {
      await rechazarOfrecimiento(id);
      setOfrecimientosRecibidos(prev => prev?.filter(o => o.id !== id) || []);
    } catch (err) {
      console.error('Error al rechazar ofrecimiento:', err);
    }
  };
  


  return (
    <div className="bg-gray-800 p-6">
      <div className="mx-auto bg-white rounded-lg shadow-lg p-6 lg:max-w-[1000px]" style={{ backgroundColor: "#ededed" }}>
        <div className="flex items-center mb-6">

          <Avatar alt="Avatar" sx={{ height: 75, width: 75 }} />
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-black">{perfil?.nombre}</h1>
            <p className="text-gray-600">{perfil?.correo}</p>
          </div>
        </div>



        {ofertasPropias && ofertasPropias.length > 0 ? (
          <section>
            <Typography variant="h6" color="black" gutterBottom>
              Mis Publicaciones activas
            </Typography>
            <Box display="flex" alignItems="center" sx={{ backgroundColor: "#ededed" }}>
              <IconButton onClick={() => scroll(scrollRef1, "left")}>
                <ArrowBackIos />
              </IconButton>
              <Box
                ref={scrollRef1}
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  gap: 2,
                  pb: 2,
                  scrollBehavior: "smooth",
                }}
              >
                {ofertasPropias.map((oferta) => (
                  <Box key={oferta.id} sx={{ minWidth: 300, flexShrink: 0 }}>
                    <Link href={`/publicacion/${oferta.id}`}> <OfferCard data={oferta} actions={false} /></Link>

                  </Box>
                ))}
              </Box>
              <IconButton onClick={() => scroll(scrollRef1, "right")}>
                <ArrowForwardIos />
              </IconButton>
            </Box>
          </section>
        ) : (
          <Typography variant="h6" color="black" gutterBottom>
            No tenés publicaciones activas
          </Typography>
        )}

        <Divider sx={{ my: 4 }} />

        {favoritos && favoritos.length > 0 ? (
          <section className="mt-8">
            <Typography variant="h6" color="black" gutterBottom>
              Publicaciones favoritas
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => scroll(scrollRef2, "left")}> <ArrowBackIos /> </IconButton>
              <Box
                ref={scrollRef2}
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  gap: 2,
                  pb: 2,
                  scrollBehavior: "smooth",
                }}
              >
                {favoritos?.map((oferta) => (
                  <Box key={oferta.id} sx={{ minWidth: 300, flexShrink: 0 }}>
                    <Link href={`/publicacion/${oferta.id}`}><OfferCard data={oferta} actions={false} /></Link>
                  </Box>
                ))}
              </Box>
              <IconButton onClick={() => scroll(scrollRef2, "right")}> <ArrowForwardIos /> </IconButton>
            </Box>
          </section>
        ) : (
          <Typography variant="h6" color="black" gutterBottom>
            No tenés publicaciones favoritas
          </Typography>
        )}

        <Divider sx={{ my: 4 }} />

        {pausadas && pausadas.length > 0 ? (
          <section className="mt-8">
            <Typography variant="h6" color="black" gutterBottom>
              Publicaciones pausadas
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => scroll(scrollRef3, "left")}> <ArrowBackIos /> </IconButton>
              <Box
                ref={scrollRef1}
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  gap: 2,
                  pb: 2,
                  scrollBehavior: "smooth",
                }}
              >
                {pausadas?.map((oferta) => (
                  <Box key={oferta.id} sx={{ minWidth: 300, flexShrink: 0 }}>
                    <Link href={`/publicacion/${oferta.id}`}><OfferCard data={oferta} actions={false} /></Link>
                  </Box>
                ))}
              </Box>
              <IconButton onClick={() => scroll(scrollRef1, "right")}> <ArrowForwardIos /> </IconButton>
            </Box>
          </section>

        ) : (
          <Typography variant="h6" color="black" gutterBottom>
            No tenés publicaciones pausadas
          </Typography>
        )}

        <Divider sx={{ my: 4 }} />

        {enviados && enviados.length > 0 ? (
          <section className="mt-8">
            <Typography variant="h6" color="black" gutterBottom>
              Publicaciones contraofertadas por mí
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => scroll(scrollRef3, "left")}> <ArrowBackIos /> </IconButton>
              <Box
                ref={scrollRef3}
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  gap: 2,
                  pb: 2,
                  scrollBehavior: "smooth",
                }}
              >
                {enviados.map((ofrec) => {
                  console.log('ofrec:', ofrec);
                  return (
                    <Box key={ofrec.id} sx={{ minWidth: 300, flexShrink: 0 }}>
                      <Link href={`/publicacion/${ofrec.oferta.id}`}>
                        <OfferCard data={ofrec.oferta} actions={false} />
                      </Link>
                    </Box>
                  );
                })}

              </Box>
              <IconButton onClick={() => scroll(scrollRef3, "right")}> <ArrowForwardIos /> </IconButton>
            </Box>
          </section>
        ) : (
          <Typography variant="h6" color="black" gutterBottom>
            No realizaste contraofertas todavía
          </Typography>
        )}

        <Divider sx={{ my: 4 }} />

        {ofrecimientosRecibidos && ofrecimientosRecibidos.length > 0 ? (
          <section className="mt-8">
            <Typography variant="h6" color="black" gutterBottom>
              Ofrecimientos recibidos en tus publicaciones
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {ofrecimientosRecibidos.map((ofrec) => (
                <Box key={ofrec.id} className="bg-white p-4 rounded shadow">
                  <Typography color="black">
                    Te hicieron una oferta sobre <strong>{ofrec.oferta.titulo}</strong>
                  </Typography>
                  <Typography color="black">
                    Usuario: {ofrec.usuario.nombre} - Mensaje: "{ofrec.mensaje}"
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() => handleAceptar(ofrec.id)}
                  >
                    Aceptar
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleRechazar(ofrec.id)}
                  >
                    Rechazar
                  </Button>
                </Box>

              ))}
            </Box>
          </section>
        ) : (
          <Typography variant="h6" color="black" gutterBottom>
            No recibiste ofrecimientos todavía.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Perfil;
