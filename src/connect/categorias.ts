import axios from "axios";

export const obtenerCategorias = async () => {
    try {
      const res = await axios.get('http://localhost:3001/categorias');
      return res.data
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };