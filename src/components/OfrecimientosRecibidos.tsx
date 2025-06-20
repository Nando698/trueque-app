// components/OfrecimientosList.tsx
import { Stack, Card, CardContent, Typography, Button, Alert } from "@mui/material";
import { Ofrecimiento } from "@/interfaces/Ofrecimiento";

interface Props {
  recibidos: Ofrecimiento[];
  onAceptar: (id: number) => void;
  onRechazar: (id: number) => void;
}

export default function OfrecimientosRecibidos({ recibidos, onAceptar, onRechazar }: Props) {
  if (recibidos.length === 0) {
    return <Typography>No recibiste ofrecimientos todavía.</Typography>;
  }

  return (
    <Stack spacing={2}>
      {recibidos.map(o => (
        <Card key={o.id}>
          <CardContent>
            <Typography><b>Oferta:</b> {o.oferta.titulo}</Typography>
            <Typography><b>Mensaje:</b> {o.mensaje || "—"}</Typography>
            <Typography><b>De:</b> {o.usuario.nombre}</Typography>
            <Typography><b>Estado:</b> {o.estado}</Typography>
            {o.estado === "PENDIENTE" ? (
              <Stack direction="row" spacing={1} mt={1}>
                <Button variant="contained" onClick={() => onAceptar(o.id)}>Aceptar</Button>
                <Button variant="outlined" color="error" onClick={() => onRechazar(o.id)}>Rechazar</Button>
              </Stack>
            ) : o.estado === "ACEPTADO" && o.contacto ? (
              <Alert severity="success" sx={{ mt: 1 }}>
                Contacto: {o.contacto.nombre}, {o.contacto.correo}
              </Alert>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
