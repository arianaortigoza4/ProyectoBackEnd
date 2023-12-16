# Descripción del 3er desafio (corresponde al commit "Entrega de desafio 3"):

* Este código en JavaScript es un ejemplo de un sistema simple de gestión de productos utilizando Node.js y Express. A continuación, se proporciona una explicación detallada de su funcionalidad:

# Clases y Funciones:
* Clase Product:
Representa un producto con propiedades como título, descripción, precio, imagen, código, y stock.
Cada producto tiene un identificador único generado utilizando la biblioteca 'uuid'.
* Clase ProductManager:
Gestiona la colección de productos.
Lee y guarda la información de los productos desde y hacia un archivo JSON especificado por filePath.
Proporciona métodos para agregar, obtener y buscar productos.
* Función generarNumRandom(min, max):
Genera un número entero aleatorio en el rango especificado.
Uso de Express:
Se utiliza el framework express para crear un servidor web.
Se define una ruta /products que devuelve la lista de productos, y una ruta /products/:id que devuelve un producto específico según el ID proporcionado.
# Uso del Código:
* Inicialización:

Se crea una instancia de ProductManager con el archivo 'products.json'.
Se crea una instancia de express y se configura para usar JSON en las solicitudes.
Rutas de la API:

* La ruta GET /products devuelve la lista de productos, y se puede especificar un límite opcional.
* La ruta GET /products/:id devuelve un producto específico por su ID.
# Ejemplo de Creación de Productos:

* Se crea un array de nombres de productos de prueba.
* Se itera sobre el array, creando productos de prueba y agregándolos al ProductManager.
* Se imprime la lista de productos después de agregar uno.
# Ejemplo de Búsqueda de Producto por ID:

* Se busca un producto recientemente creado por su ID y se imprime en la consola.
# Comentarios Deshabilitados:

* Hay secciones del código (marcadas con comentarios) que están deshabilitadas (comentadas), como las funciones updateProduct y deleteProduct.
# Ejecución del Servidor:
* El servidor se inicia en el puerto 8080, y se imprime un mensaje en la consola indicando que el servidor está en ejecución.
# Notas Finales:
Este código puede servir como base para construir una aplicación más compleja de gestión de productos, y los comentarios deshabilitados proporcionan funciones adicionales (actualización y eliminación de productos) que pueden habilitarse según las necesidades del proyecto.





