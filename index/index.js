const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises; // Uso fs.promises
const express = require('express');
const router = require('express-promise-router')(); // Uso express-promise-router

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
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            this.products = JSON.parse(data);
            if (!Array.isArray(this.products) || this.products.length < 10) {
                throw new Error("El archivo no contiene al menos 10 productos");
            }
        } catch (error) {
            this.products = [];

            // Generar productos de ejemplo si no hay suficientes
            while (this.products.length < 10) {
                const newProduct = new Product(
                    `Producto ${this.products.length + 1}`,
                    "Este es un producto de ejemplo",
                    200,
                    "Sin imagen",
                    generarNumRandom(1, 1000),
                    25
                );
                this.products.push(newProduct);
            }

            // Guardar productos generados
            try {
                await this.saveProducts();
            } catch (saveError) {
                console.error("Error al guardar productos:", saveError.message);
            }
        }
    }

    async saveProducts() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.products, null, 2), 'utf8');
        } catch (error) {
            console.error("Error al guardar productos:", error.message);
            throw error;
        }
    }

    async addProduct(product) {
        if (this.products.some(p => p.code === product.code)) {
            throw new Error("El código del producto ya existe");
        }

        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            throw new Error("Todos los campos del producto son obligatorios");
        }

        this.products.push(product);
        try {
            await this.saveProducts();
        } catch (saveError) {
            console.error("Error al guardar productos:", saveError.message);
        }
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
}

const productManager = new ProductManager('products.json');

router.get('/products', async (req, res) => {
    const limit = req.query.limit;
    try {
        await productManager.loadProducts();
        const products = limit ? productManager.getProducts().slice(0, limit) : productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

const app = express();
const port = 8080;

app.use(express.json());
app.use('/', router); // Utilizamos el enrutador con rutas asíncronas

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


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
