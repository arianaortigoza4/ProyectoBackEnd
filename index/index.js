const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

function generarNumRandom(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


class Product {
    //Implementar un constructor que inicializa products cómo un arreglo vacío
    constructor(title, description, price, thumbnail, code, stock) {

        this.id = uuidv4(); // Generar un ID único
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = this.loadProducts();
    }

    loadProducts() {
        try {
          const data = fs.readFileSync(this.filePath, 'utf8');
          return JSON.parse(data);
        } catch (error) {
          // Si el archivo no existe o hay un error, se devuelve un arreglo vacío.
          return [];
        }
      }

      saveProducts() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf8');
      }


//Implementar el método addProduct que agrega un producto a products
    addProduct(product) {
        // Verificar si el código ya existe
        if (this.products.some(p => p.code === product.code)) {
            throw new Error("El código del producto ya existe");
        }

        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            //Asegurar que todas las propiedades del producto son obligatorias
            throw new Error("Todos los campos del producto son obligatorios");
        }
//Añadir un id único y autoincrementable al producto cuando se agregue a products
        this.products.push(product);

        this.saveProducts();
    }
//Implementar el método getProducts que devuelve el arreglo products
    getProducts() {
        return this.products;
    }
//Implementar el método getProductById que busca un producto en products por su id
    getProductById(productId) {
        const product = this.products.find(p => p.id === productId);
//Si no se encuentra ningún producto con ese id, mostrar un error "Not found" en consola
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        return product;
    }

    updateProduct(productId, updatedFields) {
        const productIndex = this.products.findIndex(p => p.id === productId);
        if (productIndex === -1) {
            throw new Error("Producto no encontrado");
        }

        // Mantener el id y actualizar otros campos
        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
        this.saveProducts();
    }

    deleteProduct(productId) {
        const productIndex = this.products.findIndex(p => p.id === productId);
        if (productIndex === -1) {
            throw new Error("Producto no encontrado");
        }

        // Eliminar el producto
        this.products.splice(productIndex, 1);
        this.saveProducts();
    }
}

// Crear una instancia de ProductManager
const productManager = new ProductManager('products.json');

// Llamar a getProducts, debe devolver un arreglo vacío []
console.log("Productos al inicio:", productManager.getProducts());



const array = ['producto prueba 1','producto prueba 2','producto prueba 3','producto prueba 4']

let newProduct
array.forEach((producto) => {
    
    // Agregar un producto con addProduct
    newProduct = new Product(
        producto,
        "Este es un producto prueba",
        200,
        "Sin imagen",
        generarNumRandom(1,1000),
        25
    );
    // COMIENZO DE TEST
    try {
        productManager.addProduct(newProduct);
        console.log("Producto agregado:", newProduct);
    } catch (error) {
        console.error("Error al agregar producto:", error.message);
    }

  });






// Llamar al método getProducts nuevamente, esta vez debe aparecer el producto recién agregado
console.log("Productos después de agregar uno:", productManager.getProducts());

// Llamar al método getProductById y corroborar que devuelva el producto con el id especificado
try {
    const productFound = productManager.getProductById(newProduct.id);
    console.log("Producto encontrado por ID:", productFound);
} catch (error) {
    console.error("Error al buscar producto por ID:", error.message);
}

// Llamar al método updateProduct y cambiar un campo del producto
try {
    productManager.updateProduct(newProduct.id, { price: 250 });
    console.log("Producto actualizado:", productManager.getProductById(newProduct.id));
} catch (error) {
    console.error("Error al actualizar producto:", error.message);
}

// Llamar al método deleteProduct y evaluar que realmente se elimine el producto
try {
    productManager.deleteProduct(newProduct.id);
    console.log("Producto eliminado. Productos restantes:", productManager.getProducts());
} catch (error) {
    console.error("Error al eliminar producto:", error.message);
}
