import multer from 'multer'

// Para almacenar en memoria (útil para la versión que guarda en la base de datos)
const memoryStorage = multer.memoryStorage()

// Crear middlewares de multer
export const uploadMemory = multer({ storage: memoryStorage })
