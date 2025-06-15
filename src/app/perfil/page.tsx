"use client";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Box,
} from "@mui/material";

const Perfil: React.FC = () => {
  

  const publicaciones = [
    {
      id: 1,
      titulo: "Celular usado",
      imagen: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      titulo: "Bicicleta",
      imagen: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      titulo: "Auriculares",
      imagen: "https://via.placeholder.com/300x200",
    },
    {
      id: 4,
      titulo: "Auriculares",
      imagen: "https://via.placeholder.com/300x200",
    },
    {
      id: 5,
      titulo: "Auriculares",
      imagen: "https://via.placeholder.com/300x200",
    },
    {
      id: 6,
      titulo: "Auriculares",
      imagen: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <div className="bg-gray-800 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Avatar alt="Remy Sharp" sx={{ height: 75, width: 75 }} />
          <div className=" ml-4">
            <h1 className="text-2xl font-bold text-black">{localStorage.getItem('nombre')}</h1>´
            <p className="text-gray-600">{localStorage.getItem('correo')}</p>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-4 text-black">
          Mis Publicaciones activas
        </h2>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 2,
            pb: 1,
            "&::-webkit-scrollbar": { height: 8 },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: 4,
            },
          }}
        >
          {publicaciones.map((pub) => (
            <Card key={pub.id} sx={{ minWidth: 250, flexShrink: 0 }}>
              <CardMedia
                component="img"
                height="200"
                image={pub.imagen}
                alt={pub.titulo}
              />
              <CardContent>
                <Typography variant="h6">{pub.titulo}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Editar</Button>
                <Button size="small" color="error">
                  Eliminar
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>

        <h2 className="text-xl font-semibold mb-4 text-black mt-8">
          Publicaciones favoritas
        </h2>

        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 2,
            pb: 1,
            "&::-webkit-scrollbar": { height: 8 },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: 4,
            },
          }}
        >
          {publicaciones.map((pub) => (
            <Card key={pub.id} sx={{ minWidth: 250, flexShrink: 0 }}>
              <CardMedia
                component="img"
                height="200"
                image={pub.imagen}
                alt={pub.titulo}
              />
              <CardContent>
                <Typography variant="h6">{pub.titulo}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Ver más</Button>
                <Button size="small" color="error">
                  Eliminar
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>

      </div>
    </div>
  );
};

export default Perfil;
