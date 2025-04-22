import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.routes'
import activityRoutes from './routes/activity.routes'
import authRoutes from './routes/auth.routes'
import swaggerUI from 'swagger-ui-express'
import specs from '../swagger/swagger'

const app = express()

const PORT = process.env.PORT ?? '3000'

// Middlewares
app.use(express.json())
app.use(cors())

// Swagger
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs))

app.get('/ping', (_req, res) => {
  res.send('<h1>OK!</h1>')
})

// Rutas
app.use('/api/users', userRoutes)
app.use('/api/activities', activityRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
