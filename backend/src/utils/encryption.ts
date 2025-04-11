import bcrypt from '../lib/bcrypt'

export async function hashPassword (password: string): Promise<string> {
  const hashedPass = await bcrypt.hash(password, 12)

  return hashedPass
}

export async function comparePassword (password: string, hash: string): Promise<Boolean> {
  const isEqual = await bcrypt.compare(password, hash)

  return isEqual
}
