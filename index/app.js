const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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
      // Si el archivo no existe o hay un error, se devuelve un arreglo vacío.
      return [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf8');
  }

  addProduct(product) {
    this.products.push(product);
    this.saveProducts();
  }

  getAllProducts() {
    return this.products;
  }
}

// Uso de las clases
const productManager = new ProductManager('products.json');

// Crear un nuevo producto
const newProduct = new Product('Producto 1', 'Descripción del producto', 20, 'thumbnail.jpg', 'ABC123', 50);

// Agregar el nuevo producto
productManager.addProduct(newProduct);

// Obtener todos los productos
const allProducts = productManager.getAllProducts();
console.log('Todos los productos:', allProducts);
