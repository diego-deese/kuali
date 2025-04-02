import { hash, compare } from 'bcrypt'

export async function hashPassword (password: string): Promise<string> {
  const hashedPass = await hash(password, 12)

  return hashedPass
}

export async function comparePassword (password: string, hash: string): Promise<Boolean> {
  const isEqual = await compare(password, hash)

  return isEqual
}
