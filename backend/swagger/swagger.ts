import swaggerJsdoc from 'swagger-jsdoc'
import { DOCKER_EXPOSED_PORT } from '../src/constants/env'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Kuali API',
      version: '1.0.0',
      description: 'API build to serve a mobile application designed for the CICATA (Centro de Investigación en Ciencia Aplicada y Tecnología Avanzada) to streamline academic management and communication for students, researchers, and administrators.',
      contact: {
        name: 'Diego Sahid García Galván'
      }
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    servers: [
      {
        url: `http://localhost:${DOCKER_EXPOSED_PORT ?? 3000}/api`,
        description: 'Local server'
      }
    ]
  },
  apis: ['./swagger/*.yaml']
}

const specs = swaggerJsdoc(options)
export default specs
