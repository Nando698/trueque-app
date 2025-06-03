import { Oferta } from "@/interfaces/Oferta";
import OfferCard from "../components/MainCard";


function renderizarOfertas(ofertas: Oferta[]) {

    console.log('ofertas desde renderizarOfertas', ofertas)
    return (
        
        
        ofertas.map((oferta: Oferta) => (
                      
            
            <OfferCard key={oferta.id} data={oferta} />
           
        ))
    );
}


export const renderUtils = {
    renderizarOfertas
}