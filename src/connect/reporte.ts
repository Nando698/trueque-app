import axios from "axios"



export const reportarOferta = async (ofertaId: number, motivo: string) => {
    const token = localStorage.getItem("token");
  
    return await axios.post(
      `${process.env.NEXT_PUBLIC_BACK_URL}/reportes`,
      {
        oferta_id: ofertaId,
        motivo: motivo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };




  export const obtenerReportes = async () => {
    const token = localStorage.getItem("token");
  
    return await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_URL}/reportes`,
      
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };