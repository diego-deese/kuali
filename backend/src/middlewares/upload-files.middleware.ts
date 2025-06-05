import multer from 'multer'

const memoryStorage = multer.memoryStorage()

export const uploadMemory = multer({ storage: memoryStorage })
