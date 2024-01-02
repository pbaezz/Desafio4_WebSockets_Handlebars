import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'

import productsRouter from './routes/products.routes.js'
import viewsRouter from './routes/views.routes.js'
import socketProducts from './listener/socketProducts.js'

const server = express ()
const PORT = 8080

server.use(express.static(__dirname+'/public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))


server.use('/api', productsRouter)
server.use('/', viewsRouter)

server.engine('handlebars', handlebars.engine())
server.set('views', __dirname+'/views')
server.set('view engine', 'handlebars')


const httpServer=server.listen(PORT, ()=>{
    try{
        console.log(`Servidor Express Puerto ${PORT}\nAcceder a:`)
        console.log(`\t1). http://localhost:${PORT}/api/products`)
        console.log(`\t2). http://localhost:${PORT}/api/carts`)
    }
    catch (err){
        console.log(err)
    }
})

const socketServer = new Server(httpServer)
socketProducts(socketServer)




/* server.engine('handlebars', handlebars.engine())
server.set('views', 'src/views')
server.set('view engine', 'handlebars')

server.get('/', (req,res)=>{
    res.render('home', {})
})

server.use('/api/products', ()=>{}) */


/* const io = new Server(httpServer)

let mensajes = []

io.on('connection', socket =>{
    console.log('cliente conectado')
    
    socket.on('message', data => { //mensaje recibido
        console.log(data)
        mensajes.push(data)
        io.emit('messageLogs', mensajes) //emitiendo el msj (array)
    })
}) */