const express = require('express')
const cartsRouter = require('./routes/carts.router.js')
const productsRouter = require('./routes/products.router.js')
const ProductsManagerFS = require('./managers/productsManagerFS')
const handlebars  = require('express-handlebars')
const { Server: ServerIO, Server }  = require('socket.io') 
const fs = require('fs/promises')

const app = express()
const productsService = new ProductsManagerFS()


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
/*app.get('/realtimeproducts', (req,res)=>{
    res.render('realtimeproducts', {} )
})*/

app.get("/realtimeproducts", async (req, res) => {
    res.render("realtimeproducts");
});

app.get('/home', async (req,res)=>{
    const products = await productsService.getProducts();
    console.log("products------------------------------");
    console.log(products);

    res.render("home", {products});
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





async function updateJsonClient() {
    try {
        const response = await productsService.getProducts();
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