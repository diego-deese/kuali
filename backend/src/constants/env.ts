import 'dotenv/config'

export const KEYPHRASE = process.env.KEYPHRASE
export const DOCKER_EXPOSED_PORT = process.env.DOCKER_EXPOSED_PORT
export const ENVIRONMENT = process.env.ENVIRONMENT ?? 'production'
