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
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const Perfil: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [ofertasPropias, setOfertasPropias] = useState<Oferta[] | null>(null);
  const [favoritos, setFavoritos] = useState<Oferta[] | null>(null);
  const [perfil, setPerfil] = useState<Usuario | null>(null);

  const scrollRef1 = useRef<HTMLDivElement>(null!);
  const scrollRef2 = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode<TokenPayload>(token);
    const id = decoded.sub;
    setUserId(id);

    obtenerUsuario(id).then(setPerfil);
    obtenerOfertasPropias(id).then(setOfertasPropias);
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

  return (
    <div className="bg-gray-800 p-6">
      <div className="mx-auto bg-white rounded-lg shadow-lg p-6 lg:max-w-[1000px]">
        <div className="flex items-center mb-6">
          <Avatar alt="Avatar" sx={{ height: 75, width: 75 }} />
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-black">{perfil?.nombre}</h1>
            <p className="text-gray-600">{perfil?.correo}</p>
          </div>
        </div>

        <section>
          <Typography variant="h6" color="black" gutterBottom>
            Mis Publicaciones activas
          </Typography>
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => scroll(scrollRef1, "left")}> <ArrowBackIos /> </IconButton>
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
              {ofertasPropias?.map((oferta) => (
                <Box key={oferta.id} sx={{ minWidth: 300, flexShrink: 0 }}>
                  <OfferCard data={oferta} />
                </Box>
              ))}
            </Box>
            <IconButton onClick={() => scroll(scrollRef1, "right")}> <ArrowForwardIos /> </IconButton>
          </Box>
        </section>

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
                  <OfferCard data={oferta} />
                </Box>
              ))}
            </Box>
            <IconButton onClick={() => scroll(scrollRef2, "right")}> <ArrowForwardIos /> </IconButton>
          </Box>
        </section>
      </div>
    </div>
  );
};

export default Perfil;