import axios from "axios"

export const obtenerUsuarios = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/usuarios`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return res.data
}

export const obtenerUsuario = async (id:number) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/usuarios/me`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return res.data
}


export const desactivarUsuario = async (id:number) => {
  console.log("intentando desactivar:",id)
  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACK_URL}/usuarios/${id}/desactivar`,
    {}, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  )
  return res.data
}

export const activarUsuario = async (id:number) => {
  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACK_URL}/usuarios/${id}/activar`,
    {}, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  )
  return res.data
}


export const eliminarUsuario = async (id:number) => {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_BACK_URL}/usuarios/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  )
  return res.data
}

export const obtenerUsuariosPaginado = async (page = 1, limit = 5) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/usuarios/paginado?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return res.data;
};