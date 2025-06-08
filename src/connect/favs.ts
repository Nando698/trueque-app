import axios from "axios";

export const guardarFavorito = async (ofertaId: number) => {
  const token = localStorage.getItem("token");

  await axios.post(`http://localhost:3001/favoritos/${ofertaId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};