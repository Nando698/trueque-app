// containers/OfrecimientosRecibidosContainer.tsx
import { useEffect, useState } from "react";
import { Ofrecimiento } from "@/interfaces/Ofrecimiento";
import { obtenerOfrecimientosRecibidos, aceptarOfrecimiento, rechazarOfrecimiento } from "@/connect/ofrecimientos";
import OfrecimientosRecibidos from "../components/OfrecimientosRecibidos";
import { Typography } from "@mui/material";

export default function OfrecimientosRecibidosContainer() {
  const [recibidos, setRecibidos] = useState<Ofrecimiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerOfrecimientosRecibidos()
      .then(list => setRecibidos(list.filter(o => o.estado === "PENDIENTE")))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAceptar = async (id: number) => {
    const data = await aceptarOfrecimiento(id);
    setRecibidos(rs =>
      rs.map(o => (o.id === id ? { ...o, estado: "ACEPTADO", contacto: data.contacto } : o))
    );
  };

  const handleRechazar = async (id: number) => {
    await rechazarOfrecimiento(id);
    setRecibidos(rs =>
      rs.map(o => (o.id === id ? { ...o, estado: "RECHAZADO" } : o))
    );
  };

  if (loading) return <Typography>Cargando ofrecimientos…</Typography>;
  if (error)   return <Typography color="error">{error}</Typography>;

  return (
    <section className="mt-8">
      <Typography variant="h6">Ofrecimientos recibidos</Typography>
      <OfrecimientosRecibidos
        recibidos={recibidos}
        onAceptar={handleAceptar}
        onRechazar={handleRechazar}
      />
    </section>
  );
}
