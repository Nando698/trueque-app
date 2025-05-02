// src/utils/mockData.ts
import {
    generarUsuarios,
    generarCategorias,
    generarEtiquetas,
    generarOfertas,
    generarOfertaEtiqueta,
    generarFavoritos,
    generarUsuario,
  } from "./faker"
  
  const usuarios = generarUsuarios(5)
  const categorias = generarCategorias(3)
  const etiquetas = generarEtiquetas(8)
  const ofertas = generarOfertas(12, usuarios, categorias)
  const ofertaEtiqueta = generarOfertaEtiqueta(ofertas, etiquetas)
  const favoritos = generarFavoritos(usuarios, ofertas)
  const usuario = generarUsuario()
  
  export const mockData = {
    usuarios,
    categorias,
    etiquetas,
    ofertas,
    ofertaEtiqueta,
    favoritos,
    usuario
  }
  