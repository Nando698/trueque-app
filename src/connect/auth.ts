import axios from "axios";




export const validarToken = async (): Promise<boolean> => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const res = await axios.get('http://localhost:3001/auth/validate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data === true;
  } catch (error) {
    console.log("Error al validar token",error)
    return false;
  }
};



export const loguearse = async (
  correo: string,
  password: string
): Promise<{ ok: boolean; error?: string }> => {
  try {
    const response = await axios.post('http://localhost:3001/auth/login', {
      correo,
      password,
    });

    const token = response.data.access_token;
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('nombre', response.data.nombre);
      return { ok: true };
    }

    return { ok: false, error: 'Token no recibido' };
  } catch (error: any) {
    // Obtené mensaje del backend o de Axios
    const mensaje =
      error?.response?.data?.message || 'Error al iniciar sesión';
    return { ok: false, error: mensaje };
  }
};


 export const logOut =  () => {

    localStorage.removeItem('token')
    localStorage.removeItem('nombre')

    window.location.href = '/login'
}

export const registerFunction = async (nombre:string, correo: string, password: string): Promise<void> => {
  try {
     await axios.post('http://localhost:3001/usuarios', {
      nombre,
        correo,
      password,
      rol:'NORMAL',
      estado: 'ACTIVO'
    });
    
    
  } catch (error) {
    console.log(error);
    
  }


};


export const solicitarCodigoRecuperacion = async (correo: string) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/auth/recovery`, {
    correo,
  });
  return response.data;
};

export const cambiarPassword = async (correo: string, codigo: string, nuevaPass: string) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/auth/reset-password`, {
    correo,
    codigo,
    nuevaPass
  });

  return response.data;
};