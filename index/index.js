const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const express = require('express');

function generarNumRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.id = uuidv4();
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
            return [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf8');
    }

    addProduct(product) {
        if (this.products.some(p => p.code === product.code)) {
            throw new Error("El código del producto ya existe");
        }

        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            throw new Error("Todos los campos del producto son obligatorios");
        }

        this.products.push(product);
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        return product;
    }

   /* updateProduct(productId, updatedFields) {
        const productIndex = this.products.findIndex(p => p.id === productId);
        if (productIndex === -1) {
            throw new Error("Producto no encontrado");
        }

        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
        this.saveProducts();
    }

    deleteProduct(productId) {
        const productIndex = this.products.findIndex(p => p.id === productId);
        if (productIndex === -1) {
            throw new Error("Producto no encontrado");
        }

        this.products.splice(productIndex, 1);
        this.saveProducts();
    }*/
}

const productManager = new ProductManager('products.json');

const app = express();
const port = 8080;

app.use(express.json());

app.get('/products', (req, res) => {
    const limit = req.query.limit;
    if (limit) {
        res.json(productManager.getProducts().slice(0, limit));
    } else {
        res.json(productManager.getProducts());
    }
});

app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    try {
        const product = productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const array = ['producto prueba 1', 'producto prueba 2', 'producto prueba 3', 'producto prueba 4', 'producto prueba 5', 'producto prueba 6', 'producto prueba 7', 'producto prueba 8', 'producto prueba 9', 'producto prueba 10'];

let newProduct;
array.forEach((producto) => {
    newProduct = new Product(
        producto,
        "Este es un producto prueba",
        200,
        "Sin imagen",
        generarNumRandom(1, 1000),
        25
    );
    try {
        productManager.addProduct(newProduct);
        console.log("Producto agregado:", newProduct);
    } catch (error) {
        console.error("Error al agregar producto:", error.message);
    }
});

console.log("Productos después de agregar uno:", productManager.getProducts());

try {
    const productFound = productManager.getProductById(newProduct.id);
    console.log("Producto encontrado por ID:", productFound);
} catch (error) {
    console.error("Error al buscar producto por ID:", error.message);
}

/*try {
    productManager.updateProduct(newProduct.id, { price: 250 });
    console.log("Producto actualizado:", productManager.getProductById(newProduct.id));
} catch (error) {
    console.error("Error al actualizar producto:", error.message);
}

try {
    productManager.deleteProduct(newProduct.id);
    console.log("Producto eliminado. Productos restantes:", productManager.getProducts());
} catch (error) {
    console.error("Error al eliminar producto:", error.message);
}*/
