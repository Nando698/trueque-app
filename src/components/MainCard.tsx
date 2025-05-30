import { Categoria } from "@/interfaces/Categoria"
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
  } from "@mui/material"

  
  type Oferta = {
    id: number
    titulo: string
    descripcion: string
    imagenes: string[]
    categoria: Categoria
    fecha_publicacion: string
  }
  
  interface Props {
    data: Oferta
  }

 
  
  export default function OfferCard({ data }: Props) {
    
    

    
    return (
      <Card sx={
        {   maxWidth: 400,
            maxHeight: 400,
            marginTop: 5
        }
      } >
        <CardMedia
          component="img"
          height="120"
          image={data.imagenes?.[0]}
          alt={data.titulo}
          sx={{ 
            height: 140,
            objectFit: "cover"
            
         }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.descripcion}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" mt={1}>
            Categoría: {data.categoria.nombre}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Publicado: {data.fecha_publicacion}
          </Typography>
        </CardContent>
        <CardActions sx={{justifyContent: 'center'}}>
          <Button size="small">Ver más</Button>
          <Button size="small">Guardar</Button>
        </CardActions>
      </Card>
    )
  }
  