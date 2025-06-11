import axios from "axios"

export const obtenerUsuarios = async () => {
  const res = await axios.get(`http://localhost:3001/usuarios`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return res.data
}