import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

const app = express()

const PORT = process.env.PORT ?? '3000'

// Middlewares
app.use(express.json())
app.use(cors())

app.get('/ping', (_req, res) => {
  res.send('<h1>OK!</h1>')
})

// Rutas
app.use('/api/users', userRoutes)
app.use('/api/login', authRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
