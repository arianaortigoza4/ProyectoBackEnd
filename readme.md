# Descripción
Este código en Node.js implementa una clase ProductManager para gestionar productos. Los productos son objetos de la clase Product, cada uno con un identificador único generado automáticamente mediante la biblioteca uuid. La información de los productos se almacena en un archivo JSON (products.json) y se manipula a través de métodos como addProduct, getProducts, getProductById, updateProduct y deleteProduct.

# Uso
Instalación de dependencias:


npm install uuid

# Ejecución del código:

node index.js

# Clases
* Product
La clase Product representa un producto con las siguientes propiedades:

id: Identificador único del producto.
title: Título del producto.
description: Descripción del producto.
price: Precio del producto.
thumbnail: Enlace a la imagen del producto.
code: Código único del producto. (Modifique esta parte para que el codigo sea random y se agregaran 4 productos pero el ultimo se eliminara)
stock: Cantidad en stock del producto.

* ProductManager

La clase ProductManager gestiona la creación, lectura, actualización y eliminación de productos. También carga y guarda la información de los productos en un archivo JSON.

# Métodos:

loadProducts(): Carga los productos almacenados en el archivo JSON.
saveProducts(): Guarda los productos en el archivo JSON.
addProduct(product): Agrega un nuevo producto al conjunto de productos, verificando la unicidad del código.
getProducts(): Devuelve un arreglo con todos los productos.
getProductById(productId): Busca un producto por su identificador único.
updateProduct(productId, updatedFields): Actualiza los campos de un producto específico.
deleteProduct(productId): Elimina un producto según su identificador único.

# Ejemplos de Uso
Se proporciona un ejemplo de uso donde se crea una instancia de ProductManager, se agregan productos, se realiza una serie de operaciones sobre ellos (obtención, actualización, eliminación), y se muestran los resultados en la consola.

# Notas
Al agregar un producto se creara un archivo JSON donde voy a tener todos los productos (en mi caso son 4 productos pero el 4to producto se eliminara).




