# 📦 Trueque App

Aplicación web para publicar, buscar e intercambiar artículos entre usuarios. El sistema permite a los usuarios registrarse, gestionar sus publicaciones, marcar favoritas, enviar ofrecimientos a otras personas y la aplicación posee un panel administrador para gestionar tanto los usuarios, como las categorías y actuar frente a los reportes de los usuarios.

---

## 🚀 Tecnologías

### Frontend
- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Material UI (MUI)**
- **Axios**

### Backend
- **NestJS**
- **TypeScript**
- **PostgreSQL**
- **TypeORM**
- **JWT (autenticación)**

---

## ⚙️ Configuración del entorno

### Configuración del FrontEnd

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/trueque-app.git
```
### 2. Configurar tu .env.local
Configurar en la raiz de tu proyecto el archivo *.env.local*
```bash
NEXT_PUBLIC_BACK_URL=http://localhost:3001
```
### 3. Instalar los paquetes
```bash
npm i
```
### 4. Ejecutar el Front
```bash
npm run dev
```

### Configuración del Backend

### 1. Clonar el repositorio
```bash
git clone https://github.com/Nando698/trueque-app-backend.git
```

### 2. Configurar tu .env
Configurar en la raiz de tu proyecto el archivo *.env* con las credenciales de tu DB (DataBase)
```bash
DB_HOST=****
DB_PORT=****
DB_USERNAME=****
DB_NAME=****
DB_PASSWORD=****
PORT=****
```

## 🧪 Funcionalidades principales
- Registro e inicio de sesión de usuarios

- Visualización de ofertas públicas

- Creación, edición y eliminación de ofertas

- Sistema de favoritos

- Envío y recepción de ofrecimientos

- Panel de administrador (categorías, usuarios y reportes)

- Reportes de contenido inapropiado

- Búsqueda filtrada por palabra clave y categoría

👨‍💻 Autores

[Fernando Diaz]

[Matias Fredes]