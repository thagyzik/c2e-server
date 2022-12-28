import express from 'express'
import routes from './routes'
import cors from 'cors'
import path from 'path';
import { errors } from 'celebrate'

const port = process.env.PORT || 3333
const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)

app.use('/images', express.static(path.resolve(__dirname, '..', 'images')))

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(errors())

app.listen(port, () => {
    console.log(`Servidor esta rodando na porta ${port}`)
})