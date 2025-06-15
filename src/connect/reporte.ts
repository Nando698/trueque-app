import axios from "axios"



export const reportarOferta = async (ofertaId: number, motivo: string) => {
    const token = localStorage.getItem("token");
  
    return await axios.post(
      "http://localhost:3001/reportes",
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
      "http://localhost:3001/reportes",
      
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };