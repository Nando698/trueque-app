import axios from "axios";
import { Contacto } from "@/interfaces/Contacto";

export const enviarMensajeContacto = async (nombre: string, correo: string, mensaje: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACK_URL}/contacto`;
  console.log("Enviando POST a:", url);

  try {
    const res = await axios.post(url, {
      nombre,
      correo,
      mensaje
    });
    return res.data;
  } catch (error) {
    console.error("❌ Error al enviar mensaje de contacto:", error);
    throw error;
  }
};

export const obtenerMensajesContacto = async (): Promise<Contacto[]> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/contacto`);
  return res.data;
};

export const eliminarMensajeContacto = async (id: number) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/contacto/${id}`);
  } catch (error) {
    console.error("Error al eliminar mensaje:", error);
    throw error;
  }
};

