import axios from "axios";

export const obtenerCategorias = async () => {
  try {
    const res = await axios.get("http://localhost:3001/categorias");
    return res.data;
  } catch (error) {
    console.error("Error al cargar categorías:", error);
  }
};

export const eliminarCategoria = async (id: number) => {
  return axios.delete(`http://localhost:3001/categorias/${id}`);
};

export const crearCategoria = async (nombre: string) => {
  try {
    await axios.post(`http://localhost:3001/categorias/`, { nombre });
  } catch (e) {
    console.error("Error al eliminar categoría:", e);
  }
};
