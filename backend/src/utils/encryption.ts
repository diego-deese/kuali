import bcrypt from '../lib/bcrypt'
import crypto from '../lib/crypto'

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPass = await bcrypt.hash(password, 12)

  return hashedPass
}

export const comparePassword = async (password: string, hash: string): Promise<Boolean> => {
  const isEqual = await bcrypt.compare(password, hash)

  return isEqual
}

export const hashToken = (token: string): string => {
  return crypto.createHash('sha512').update(token).digest('hex')
}
