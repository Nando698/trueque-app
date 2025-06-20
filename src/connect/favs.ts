import axios from "axios";

export const guardarFavorito = async (ofertaId: number) => {
  const token = localStorage.getItem("token");

  await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/favoritos/${ofertaId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};




export const obtenerFavoritos = async () => {
  const token = localStorage.getItem("token");

  return await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/favoritos/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};