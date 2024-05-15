const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar solicitudes con cuerpo en JSON
app.use(bodyParser.json());

// Ruta al archivo db.json
const dbPath = 'database/db.json';

// Función para leer los datos del archivo db.json
function readDB() {
    const rawData = fs.readFileSync(dbPath);
    return JSON.parse(rawData);
}

// Función para escribir los datos en el archivo db.json
function writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Manejar solicitud GET para obtener todos los productos
app.get('/products', (req, res) => {
    const products = readDB();
    res.json(products);
});

// Manejar solicitud POST para agregar un nuevo producto
app.post('/products', (req, res) => {
    const products = readDB();
    const { name, price } = req.body;
    const id = products.length + 1;
    const newProduct = { id, name, price };
    products.push(newProduct);
    writeDB(products);
    res.status(201).json(newProduct);
});

// Manejar solicitud DELETE para eliminar un producto por ID
app.delete('/products/:id', (req, res) => {
    const products = readDB();
    const { id } = req.params;
    const filteredProducts = products.filter(product => product.id !== parseInt(id));
    writeDB(filteredProducts);
    res.sendStatus(204);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
