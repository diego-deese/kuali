import multer from 'multer'

// Configuración de almacenamiento para archivos
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(process.cwd(), 'uploads'))
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
//     cb(null, uniqueSuffix + path.extname(file.originalname))
//   }
// })

// Para almacenar en memoria (útil para la versión que guarda en la base de datos)
const memoryStorage = multer.memoryStorage()

// Crear middlewares de multer
// const uploadDisk = multer({ storage })
export const uploadMemory = multer({ storage: memoryStorage })
