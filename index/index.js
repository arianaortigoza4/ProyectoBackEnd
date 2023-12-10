const { v4: uuidv4 } = require('uuid');

class Product {
    //Implementar un constructor que inicializa products cómo un arreglo vacío
    constructor(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            //Asegurar que todas las propiedades del producto son obligatorias
            throw new Error("Todos los campos del producto son obligatorios");
        }

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
    constructor() {
        this.products = [];
    }
//Implementar el método addProduct que agrega un producto a products
    addProduct(product) {
        // Verificar si el código ya existe
        if (this.products.some(p => p.code === product.code)) {
            throw new Error("El código del producto ya existe");
        }
//Añadir un id único y autoincrementable al producto cuando se agregue a products
        this.products.push(product);
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
    }

    deleteProduct(productId) {
        const productIndex = this.products.findIndex(p => p.id === productId);
        if (productIndex === -1) {
            throw new Error("Producto no encontrado");
        }

        // Eliminar el producto
        this.products.splice(productIndex, 1);
    }
}

// Crear una instancia de ProductManager
const productManager = new ProductManager();

// Llamar a getProducts, debe devolver un arreglo vacío []
console.log("Productos al inicio:", productManager.getProducts());

// Agregar un producto con addProduct
const newProduct = new Product(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
);
productManager.addProduct(newProduct);
console.log("Productos después de agregar uno:", productManager.getProducts());

// Llamar al método getProductById
try {
    const productFound = productManager.getProductById(newProduct.id);
    console.log("Producto encontrado por ID:", productFound);
} catch (error) {
    console.error("Error al buscar producto por ID:", error.message);
}

// Llamar al método updateProduct
try {
    productManager.updateProduct(newProduct.id, { price: 250 });
    console.log("Producto actualizado:", productManager.getProductById(newProduct.id));
} catch (error) {
    console.error("Error al actualizar producto:", error.message);
}

// Llamar al método deleteProduct
try {
    productManager.deleteProduct(newProduct.id);
    console.log("Producto eliminado. Productos restantes:", productManager.getProducts());
} catch (error) {
    console.error("Error al eliminar producto:", error.message);
}


