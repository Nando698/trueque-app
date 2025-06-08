import { Oferta } from "@/interfaces/Oferta";
import OfferCard from "../components/MainCard";


function renderizarOfertas(ofertas?: Oferta[]) {
  if (!ofertas || ofertas.length === 0) {
    return <p>No hay ofertas disponibles.</p>;
  }

  return (
    <>
      {ofertas.map((oferta) => (
        <OfferCard key={oferta.id} data={oferta} />
      ))}
    </>
  );
}



export const renderUtils = {
    renderizarOfertas
}