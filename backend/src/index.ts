import express from 'express'
import cors from 'cors'

const app = express()

const PORT = process.env.PORT ?? '3000'

// Middlewares
app.use(express.json())
app.use(cors())

app.get('/ping', (_req, res) => {
  res.send('<h1>OK!</h1>')
})

const startServer = async (): Promise<void> => {
  try {
    console.log('Database connected succesfully!')

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  } catch (error) {
    if (error instanceof Error) {
      console.log(`An error occurred while starting the server ${error.message}`)
    } else {
      console.log('An unknown error occurred while starting the server')
    }
    throw error
  }
}

void startServer()
