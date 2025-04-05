import fs from 'fs'

export const getFileBuffer = (fileRoute: string): Buffer<ArrayBufferLike> => {
  const fileBuffer = fs.readFileSync(fileRoute)
  return fileBuffer
}
