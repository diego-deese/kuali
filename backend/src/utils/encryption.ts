import { hash } from 'bcrypt'

async function hashPassword (password: string): Promise<string> {
  const hashedPass = await hash(password, 10)

  return hashedPass
}

export default hashPassword
