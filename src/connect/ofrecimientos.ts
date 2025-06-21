import { Ofrecimiento } from '@/interfaces/Ofrecimiento';
import axios from 'axios';

export const obtenerOfrecimientosRecibidos = async (): Promise<Ofrecimiento[]> => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/ofrecimientos/recibidos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  export const aceptarOfrecimiento = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token no encontrado");
  
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK_URL}/ofrecimientos/${id}/aceptar`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  
    return response.data; // acá devolvés los datos actualizados del ofrecimiento
  };
  
  export const rechazarOfrecimiento = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token no encontrado");
  
    await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/ofrecimientos/${id}/rechazar`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };


export const obtenerOfrecimientosEnviados = async (): Promise<Ofrecimiento[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/ofrecimientos/enviados`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  };

  



  export const crearOfrecimiento = async (
    oferta_id: number,
    mensaje: string
  ) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token no encontrado");
  
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK_URL}/ofrecimientos`,
      {
        oferta_id,
        mensaje,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return response.data;
  };
  
  