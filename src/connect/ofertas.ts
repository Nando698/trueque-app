import axios from 'axios'



export const obtenerOfertas = async () => {
  const res = await axios.get(`http://localhost:3001/ofertas`)
  return res.data
}
