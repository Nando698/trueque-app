import axios from "axios"

export const obtenerUsuarios = async () => {
  const res = await axios.get(`http://localhost:3001/usuarios`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return res.data
}

export const obtenerUsuario = async (id:number) => {
  const res = await axios.get(`http://localhost:3001/usuarios/${id}`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return res.data
}