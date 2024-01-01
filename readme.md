# Descripción del 4to desafio (corresponde al commit "Solucionado el id duplicado2"):

# Rutas de Carts
* Crear un nuevo carrito:

Método: POST
URL: http://localhost:8080/api/carts
Descripción: Genera un nuevo carrito vacío con un nuevo ID.
Consultar un carrito por ID:

Método: GET
URL: http://localhost:8080/api/carts/11
Descripción: Consulta y devuelve los detalles de un carrito específico identificado por el ID 11.
* Agregar un nuevo producto a un carrito existente:

Método: POST
URL: http://localhost:8080/api/carts/11/products/560
Descripción: Agrega un nuevo producto al carrito identificado por el ID 11.
# Rutas de Products
* Crear un nuevo producto:

Método: POST
URL: http://localhost:8080/api/products
Descripción: Genera un nuevo producto vacío con un nuevo ID.
* Consultar todos los productos:

Método: GET
URL: http://localhost:8080/api/products
Descripción: Retorna todos los productos disponibles.
Consultar productos con un límite:

Método: GET
URL: http://localhost:8080/api/products?limit=5
Descripción: Retorna los primeros 5 productos, o la cantidad especificada por el parámetro "limit".
* Consultar un producto por ID:

Método: GET
URL: http://localhost:8080/api/products/17
Descripción: Retorna los detalles del producto identificado por el ID 17.
* Actualizar un producto por ID:

Método: PUT
URL: http://localhost:8080/api/products/17
Content-Type: application/json
Descripción: Actualiza los detalles del producto identificado por el ID 17 con la información proporcionada en el cuerpo JSON.
* Eliminar un producto por ID:

Método: DELETE
URL: http://localhost:8080/api/products/6
Descripción: Elimina el producto identificado por el ID 6.

# .REST
Estas rutas siguen el estilo REST (Representational State Transfer) para diseñar servicios web. El método HTTP utilizado en cada ruta indica la operación que se realizará en el recurso correspondiente (GET para obtener, POST para crear, PUT para actualizar y DELETE para eliminar).