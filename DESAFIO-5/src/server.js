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

app.get('/home', (req,res)=>{
    res.render('home', {} )
})


app.use('/api/carts',    cartsRouter)
app.use('/api/products', (req, res, next) => {
    // Call your custom function here
    updateJsonClient();
    console.log('UPDATE PRODUCT')
    // Continue to the next middleware/route handler
    next();
});
app.use('/api/products', productsRouter);


const httpServer =  app.listen(8080, ()=>{
    console.log('Escuchando en el puerto 8080')
})
// socket del lado del server
const io = new ServerIO(httpServer)

let mensajes = []

async function readFile(path){
    try {
        const dataProducts = await fs.readFile(path, 'utf-8') 
        return JSON.parse(dataProducts)
    } catch (error) {
        return []
    }
}

async function getProductsByFile(path) {
    const products = await readFile(path);

    if (!products || products.length === 0) {
        return 'producto vacío';
    }

    return products
}

async function updateJsonClient() {
    try {
        const response = await getProductsByFile('../BackEnd/DESAFIO-5/src/jsonDb/Products.json');
        const jsonData = JSON.stringify(response, null, 2);
        io.emit('message', jsonData)
        console.log("\n\n\n\n\n updateJsonClient \n\n\n\n\n" + jsonData)
        
    } catch (error) {
        console.error('Error al obtener datos JSON:', error);
    }
}


//setInterval(updateJsonClient, 300);



function cbConnection(socket) {	
    console.log('cliente conectado')
    updateJsonClient();
    socket.on('message', data => {
        console.log(data)
        mensajes.push(data)
        console.log('MENSAJE RECIBIDO EN EL SERVER')
        //updateJsonClient();

        
    })
}

io.on('connection', socket =>{cbConnection(socket)})