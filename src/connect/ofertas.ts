import axios from 'axios'



export const obtenerOfertas = async () => {
  const res = await axios.get(`http://localhost:3001/ofertas`)
  return res.data
}




export const crearOferta = async (
  titulo: string,
  descripcion: string,
  files: FileList | null,
  categoria_id: number,
  estado: string,
  usuario_id: number
) => {
  const formData = new FormData();
  formData.append('titulo', titulo);
  formData.append('descripcion', descripcion);
  formData.append('categoria_id',categoria_id.toString() )
  formData.append('estado', estado)
  formData.append('usuario_id', usuario_id.toString())

console.log(formData)
  if (files) {
    for (let i = 0; i < files.length; i++) {
      formData.append('imagenes', files[i]);
    }
  }

  const response = await axios.post('http://localhost:3001/ofertas', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};