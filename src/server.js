import express from 'express'
import usersRouter from './routes/users.routes.js'
import cartsRouter from './routes/carts.routes.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'


const server = express ()
const PORT = 8080

server.use(express.static('src/public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.engine('handlebars', handlebars.engine())
server.set('views', 'src/views')
server.set('view engine', 'handlebars')

server.get('/', (req,res)=>{
    res.render('index', {})
})

server.use('/api/users', usersRouter)
server.use('/api/carts', cartsRouter)
server.use('/api/products', ()=>{})

const httpServer = server.listen(PORT, ()=>{
    console.log(`Servidor Express Puerto ${PORT}`)
})

const io = new Server(httpServer)

io.on('connection', socket =>{
    console.log('cliente conectado')
})