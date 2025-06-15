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



export const loguearse = async (correo: string, password: string): Promise<boolean> => {
  try {
    const response = await axios.post('http://localhost:3001/auth/login', {
      correo,
      password,
    });

    const token = response.data.access_token;
    console.log(response)
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('nombre', response.data.nombre )
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
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