const express = require('express')
const cartsRouter = require('./routes/carts.router.js')
const productsRouter = require('./routes/products.router.js')
const handlebars  = require('express-handlebars')
const { Server: ServerIO, Server }  = require('socket.io') 
const fs = require('fs/promises')

const app = express()

console.log(__dirname+'/public')
app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

// http://localhost:8080 /
app.get('/', (req,res)=>{
    res.render('index', {} )
})
app.get('/realtimeproducts', (req,res)=>{
    res.render('realtimeproducts', {} )
})

app.use('/api/carts',    cartsRouter)
app.use('/api/products', productsRouter)


app.get('/api/products', (req,res)=>{
    console.log('UPDATE PRODUCT')
})

const httpServer =  app.listen(8080, ()=>{
    console.log('Escuchando en el puerto 8080')
})
// socket del lado del server
const io = new ServerIO(httpServer)

let mensajes = []


async function updateJsonClient() {
    try {
        const response = await fetch('http://localhost:8080/api/products');
        const jsonData = await response.json();
        //console.log("RESPONSE \n\n\n\n\n" + JSON.stringify(jsonData.payload, null, 2))
        io.emit('message', jsonData)
        
    } catch (error) {
        console.error('Error al obtener datos JSON:', error);
    }
}


setInterval(updateJsonClient, 300);



function cbConnection(socket) {	
    console.log('cliente conectado')
    socket.on('message', data => {
        console.log(data)
        mensajes.push(data)
        console.log('MENSAJE RECIBIDO EN EL SERVER')
        updateJsonClient();

        
    })
}

io.on('connection', socket =>{cbConnection(socket)})