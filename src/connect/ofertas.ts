import axios from 'axios'



export const obtenerOfertas = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/ofertas`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return res.data
}

export const obtenerOfertasPropias = async (id: number, estado?: string) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/ofertas`, {
    params: {
      usuario_id: id,
      estado,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return response.data;
};


export const buscarOfertas = async (
  categoriaId?: string,
  keywords?: string
) => {
  const params = new URLSearchParams();
  if (categoriaId) params.append('categoria_id', categoriaId);
  if (keywords) params.append('keywords', keywords);

  const token = localStorage.getItem('token');
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/ofertas/buscar?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};





export const borrarOferta = async (id:number) => {
  const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/ofertas/${id}`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })

  return res.data
}


export const obtenerUnaOferta = async (id:number) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/ofertas/${id}`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return res.data
}


export const crearOferta = async (
  titulo: string,
  descripcion: string,
  cambio:string,
  files: FileList | null,
  categoria_id: number,
  estado: string,
  usuario_id: number
) => {
  const formData = new FormData();
  formData.append('titulo', titulo);
  formData.append('descripcion', descripcion);
  formData.append('cambio', cambio);
  formData.append('categoria_id',categoria_id.toString() )
  formData.append('estado', estado)
  formData.append('usuario_id', usuario_id.toString())


  if (files) {
    for (let i = 0; i < files.length; i++) {
      formData.append('imagenes', files[i]);
    }
  }

  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/1/ofertas`, formData, {
    headers: { 'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
     },
  });

  return response.data;
};

export const pausarOferta = async (id: number) => {
  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACK_URL}/ofertas/${id}/pausar`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return res.data;
};

export const despausarOferta = async (id: number) => {
  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACK_URL}/ofertas/${id}/despausar`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return res.data;
};

export const finalizarOferta = async (id: number) => {
  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACK_URL}/ofertas/${id}/finalizar`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return res.data;
};