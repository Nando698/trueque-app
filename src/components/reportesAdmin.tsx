'use client';

import { Reporte } from '@/interfaces/reporte';
import { Box, Button, Paper, Typography, Link } from '@mui/material';

interface Props {
  reportes: Reporte[];
}

export default function ReportesAdmin({ reportes }: Props) {
  if (reportes.length === 0) {
    return <Typography color="white">No hay reportes</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom color="white">
        Ofertas reportadas
      </Typography>

      {reportes.map((reporte, idx) => (
        <Paper key={idx} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Oferta: {reporte.oferta?.titulo}
          </Typography>
          <Typography variant="body2">
            Usuario que reportó: {reporte.usuario?.nombre} ({reporte.usuario?.correo})
          </Typography>
          <Typography variant="body2">Motivo: {reporte.motivo}</Typography>
          <Typography variant="caption" color="gray">
            Fecha: {new Date(reporte.fechaReporte).toLocaleString()}
          </Typography>
          <Link href={`/publicacion/${reporte.oferta?.id}`}>
            <Button variant="text" color="primary">
              Ver oferta
            </Button>
          </Link>
        </Paper>
      ))}
    </Box>
  );
}
