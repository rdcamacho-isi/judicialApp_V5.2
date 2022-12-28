import express from 'express'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import routers from "./router.js"
// import session from 'express-session'

const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url))

app.set("views", join(__dirname, 'views'))
app.set("view engine", 'ejs')

app.use(express.static(join(__dirname, 'views')))
app.use(routers)


console.log(__dirname)

app.listen(8080)
console.log("Servidor iniciado")