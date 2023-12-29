# Descripción del 4to desafio (corresponde al commit "Ultima funcion GET funcionando"):

# ¿Que hace el codigo? 
* Crear un nuevo carrito vacío con un nuevo ID:

Método: POST
Endpoint: http://localhost:8080/api/carts
Acción:
Esta solicitud crea un nuevo objeto de carrito vacío con un nuevo ID.
* Obtener todos los carritos:

Método: GET
Endpoint: http://localhost:8080/api/carts
Acción:
Retorna todos los carritos existentes en la base de datos.
* Obtener un número limitado de carritos:

Método: GET
Endpoint: http://localhost:8080/api/carts?limit=8
Parámetro de consulta: limit=8
Acción:
Retorna un número limitado de carritos (en este caso, 8 carritos).
* Obtener un carrito específico por su ID:

Método: GET
Endpoint: http://localhost:8080/api/carts/14
Acción:
Retorna información sobre el carrito con ID 14.
Actualizar un carrito específico por su ID:

Método: PUT
Endpoint: http://localhost:8080/api/carts/14
Content-Type: application/json
* Eliminar un carrito específico por su ID:

Método: DELETE
Endpoint: http://localhost:8080/api/carts/8
Acción:
Elimina el carrito con ID 8.
* Agregar un nuevo producto a un carrito existente:

Método: POST
Endpoint: http://localhost:8080/api/carts/14/products/547
Acción:
Agrega un nuevo producto con ID 547 al carrito con ID 14.  
# IMPORTANTE 
* Lo que entendi es que en el metodo GET de http://localhost:8080/api/cart se tiene que traer todos los productos, en el enunciado no especifica si se tiene que usar http://localhost:8080/products como en el desafio anterior por eso lo hice de esa manera, de todas formas funciona pero con la api/cart. 