import axios from "axios";

const manejarSubmit = async (e: React.FormEvent, name:string, email:string, password:string) => {
  e.preventDefault();

  try {
    console.log("Enviando datos:", { name, email, password });
    const response = await axios.post("http://localhost:3001/usuarios", {
      nombre: name,
      correo: email,
      password: password,
      rol: "NORMAL",
      estado: "ACTIVO"
    });

    console.log("Usuario creado:", response.data);
    window.location.replace("/login");
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error al crear usuario:", error.response?.data || error.message);
    } else {
      console.error("Error desconocido:", error);
    }
  }
};


export {manejarSubmit}