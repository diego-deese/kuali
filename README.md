# CICATA Mobile Application (Kuali)

## Project Overview
This mobile application is designed for the CICATA (Centro de Investigación en Ciencia Aplicada y Tecnología Avanzada) to streamline academic management and communication for students, researchers, and administrators.

## Installation

### Requisitos previos
- [Docker](https://www.docker.com/products/docker-desktop/) instalado y configurado
- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

### Configuración del entorno
1. Clona este repositorio en tu máquina local
2. Navega al directorio del backend:
   ```
   cd backend
   ```
3. Copia el archivo de variables de entorno de ejemplo:
   ```
   cp .env.example .env
   ```
4. Edita el archivo `.env` con tus configuraciones específicas (credenciales de base de datos, puertos, etc.)

### Levantando el proyecto con Docker

Para facilidad en el proceso de desarrollo el proyecto tiene scripts definidos que ejecutan varios comandos utiles

1. Construye la imagen del contenedor:
   ```
   npm run docker:build
   ```

2. Ejecuta el contenedor:
   ```
   npm run docker:start
   ```

### Configuración de Prisma

Prisma es nuestro ORM para gestionar la base de datos. Estas son las operaciones más comunes:

1. **Generar el cliente Prisma**:
   ```
   npm run db:generate
   ```

2. **Aplicar migraciones existentes**:
   ```
   npm run db:deploy
   ```

3. **Crear una nueva migración** (cuando cambies el schema):
   ```
   npm run db:migrate
   ```

4. **Aplicar migraciones y generar cliente** (hacer todas las operaciones para actualizar la BD) :
   ```
   npm run db:init
   ```

5. **Visualizar la base de datos** con Prisma Studio:
   ```
   npx prisma studio
   ```

### Desarrollo local (sin Docker)

Si prefieres ejecutar el proyecto localmente sin Docker:

1. Instala las dependencias:
   ```
   npm install
   ```

2. Genera el cliente Prisma:
   ```
   npx prisma generate
   ```

3. Aplica las migraciones:
   ```
   npx prisma migrate deploy
   ```

4. Inicia el servidor en modo desarrollo:
   ```
   npm run dev
   ```

El servidor estará disponible en `http://localhost:3000` (o el puerto que hayas configurado en tu archivo `.env`).

## Team Members
- Dulce Nahomi Bucio Rivas (A01425284)
- Diego Sahid García Galván (A01425242)
- Juan Pablo Sebastián Escobar Juárez (A01424009)
- Erick Arjuna Blas Flores (A01423872)

## Key Features

### For Students
- View academic calendar with events and calls
- Subscribe to events and receive notifications
- Track document requirements for calls
- Upload and manage documents for applications
- Access academic profile
- View digital identification

### For Researchers
- View academic calendar
- Manage assigned students
- Subscribe to events and receive notifications
- Upload and track documents
- Access personal academic profile

### For Administrators
- Create and manage users
- Create, edit, and delete events
- Create and manage calls for applications
- Review and approve submitted documents
- Generate participation reports

## Technical Specifications
- **Platform:** Mobile Application
- **Framework:** React Native
- **Compatibility:** iOS and Android
- **Authentication:** Credential-based login
- **Database:** Secure and scalable
- **API:** RESTful API

## Usage
*Comprehensive usage guide will be provided with the application*

## Contributing
*Guidelines for contributing to the project will be defined*

## License
*License information to be added*

## Contact
For more information, please contact the project team or CICATA administration.

**Project Date:** March 2025