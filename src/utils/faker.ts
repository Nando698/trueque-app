import { Categoria } from '@/interfaces/Categoria'
import { Etiqueta } from '@/interfaces/Etiqueta'
import { Oferta } from '@/interfaces/Oferta'
import { Usuario } from '@/interfaces/Usuario'
import { faker } from '@faker-js/faker'

// Genera usuarios falsos
export function generarUsuarios(cantidad: number) {
  return Array.from({ length: cantidad }).map((_, i) => ({
    id: i + 1,
    nombre: faker.person.fullName(),
    correo: faker.internet.email(),
    password: faker.internet.password(), // solo para simular
    rol: faker.helpers.arrayElement(['ADMIN', 'REGULAR']),
    estado: faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']),
    fecha_creacion: faker.date.past().toISOString().split('T')[0],
  }))
}

// Genera usuario (uno) falso
export function generarUsuario() {
    return {
      
      nombre: faker.person.fullName(),
      correo: faker.internet.email(),
      password: faker.internet.password(), // solo para simular
      rol: faker.helpers.arrayElement(['ADMIN', 'REGULAR']),
      estado: faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']),
      fecha_creacion: faker.date.past().toISOString().split('T')[0],
      avatar: faker.image.avatar()
    }
  }

// Genera categorías y etiquetas
export function generarCategorias(n = 5) {
  return Array.from({ length: n }).map((_, i) => ({
    id: i + 1,
    nombre: faker.commerce.department(),
  }))
}
export function generarEtiquetas(n = 10) {
  return Array.from({ length: n }).map((_, i) => ({
    id: i + 1,
    nombre: faker.word.adjective(),
  }))
}

// Genera ofertas con relaciones
export function generarOfertas(cantidad: number, usuarios: Usuario[], categorias: Categoria[]) {
  return Array.from({ length: cantidad }).map((_, i) => ({
    id: i + 1,
    usuario_id: faker.helpers.arrayElement(usuarios).id,
    titulo: faker.commerce.productName(),
    descripcion: faker.commerce.productDescription(),
    categoria: faker.helpers.arrayElement(categorias).nombre,
    fecha_publicacion: faker.date.recent().toISOString().split('T')[0],
    estado: faker.helpers.arrayElement(['ACTIVA', 'INACTIVA']),
    img: faker.image.url()
  }))
}

// Genera relaciones oferta-etiqueta
export function generarOfertaEtiqueta(ofertas: Oferta[], etiquetas: Etiqueta[]) {
  return ofertas.flatMap(oferta => {
    const randomEtiquetas = faker.helpers.arrayElements(etiquetas, 2)
    return randomEtiquetas.map(etiqueta => ({
      oferta_id: oferta.id,
      etiqueta_id: etiqueta.id,
    }))
  })
}

// Favoritos entre usuarios y ofertas
export function generarFavoritos(usuarios: Usuario[], ofertas: Oferta[]) {
  return usuarios.flatMap(usuario => {
    const favoritas = faker.helpers.arrayElements(ofertas, 2)
    return favoritas.map(oferta => ({
      usuario_id: usuario.id,
      oferta_id: oferta.id,
    }))
  })
}

export function generarAvatar() {
    return faker.image.avatar()
}