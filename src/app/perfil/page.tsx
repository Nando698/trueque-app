
'use client'
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
  
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { obtenerOfrecimientosEnviados, obtenerOfrecimientosRecibidos} from '@/connect/ofrecimientos';
import { Ofrecimiento } from '@/interfaces/Ofrecimiento';
import PerfilOfrecimientosRecibidosContainer from "../../containers/PerfilOfrecimientosRecibidosContainer";
import MiniCard from "@/components/MiniCard";




const Perfil: React.FC = () => {
  
  const [ofertasPropias, setOfertasPropias] = useState<Oferta[] | null>(null);
  const [favoritos, setFavoritos] = useState<Oferta[] | null>(null);
  const [perfil, setPerfil] = useState<Usuario | null>(null);
  const [pausadas, setPausadas] = useState<Oferta[] | null>(null);
  const [enviados, setEnviados] = useState<Ofrecimiento[]>();
  const [ofrecimientosRecibidos, setOfrecimientosRecibidos] = useState<Ofrecimiento[] | null>(null);
  



  const scrollRef1 = useRef<HTMLDivElement>(null!);
  const scrollRef2 = useRef<HTMLDivElement>(null!);
  const scrollRef3 = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode<TokenPayload>(token);
    const id = decoded.sub;
    


    obtenerOfrecimientosRecibidos()
      .then(ofrecimientos => {
        console.log("OFRECIMIENTOS", ofrecimientos)
        const pendientes = ofrecimientos.filter(o => o.estado === 'PENDIENTE');
        setOfrecimientosRecibidos(pendientes);
      })
      .catch(console.error);


    obtenerOfrecimientosEnviados().then(ofrecimientos => {
      const activos = ofrecimientos.filter(o => o.oferta.estado === 'ACTIVA' && o.estado === 'PENDIENTE');
      setEnviados(activos);
      console.log("filtrados activos:", activos);
    })
      .catch(console.error);



    obtenerFavoritos()
      .then(({ data }) => {
        const activas = data.filter((o: { estado: string; }) => o.estado === 'ACTIVA');
        setFavoritos(activas);
      })
      .catch(console.error);


    obtenerUsuario().then(setPerfil);
    obtenerOfertasPropias(id, "ACTIVA").then(setOfertasPropias);
    obtenerOfertasPropias(id, "PAUSADA").then(setPausadas); 

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
                    <Link href={`/publicacion/${oferta.id}`}> <MiniCard oferta={oferta} /></Link>

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
                    <Link href={`/publicacion/${oferta.id}`}><MiniCard oferta={oferta} /></Link>
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
                    <Link href={`/publicacion/${oferta.id}`}><MiniCard oferta={oferta} /></Link>
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
                      <MiniCard oferta={ofrec.oferta} />
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
          <PerfilOfrecimientosRecibidosContainer />
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