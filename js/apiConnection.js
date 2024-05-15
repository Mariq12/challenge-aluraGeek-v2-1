// Conecta con la API para obtener los productos
async function productList(apiUrl) {
    try {
        const connection = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });
        const connectionConverted = await connection.json();
        return connectionConverted;
    } catch (error) {
        console.error("Error al conectar con la API:", error);
        throw error; 
    }
}

// Función para enviar un producto
async function sendProduct(image_url, name, category, description, price, amount, vat_rate, discount){
    const connection = await fetch(`http://localhost:3001/product`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            image_url: image_url,
            name: name,
            category: category,
            description: description,
            price: price,
            amount: amount,
            vat_rate: vat_rate,
            discount: discount
        })
    })
    const connectionConvert = connection.json();
    if(!connection.ok){
        throw new Error("No es posible enviar el producto");
    }
    return connectionConvert;
}

async function sendOnlineProduct(image_url, name, category, description, price, amount, vat_rate, discount){
    const connection = await fetch(`https://api-89ls.onrender.com/product/save/null`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            image_url: image_url,
            name: name,
            category: category,
            description: description,
            price: price,
            amount: amount,
            vat_rate: vat_rate,
            discount: discount
        })
    })
    const connectionConvert = connection.json();
    if(!connection.ok){
        throw new Error("No es posible enviar el producto");
    }
    return connectionConvert;
}

// Función para eliminar un producto
async function deleteProduct(id) {
    const connection = await fetch(`http://localhost:3001/product/${id}`, {
        method: "DELETE",
      });
      const convertConnection = connection.json();
    
      if (!connection.ok) {
        throw new Error("No se ha podido eliminar el producto");
      }
      
      return convertConnection;
}

async function deleteOnlineProduct(id) {
    try {
        const connection = await fetch(`https://api-89ls.onrender.com/product/delete/${id}`, {
            method: "GET",
        });

        if (!connection.ok) {
            throw new Error("No se ha podido eliminar el producto");
        }

        return await connection.json();
    } catch (error) {
        console.error("Error al eliminar el producto en el servidor en línea:", error);
        throw error;
    }
}

// Función para actualizar un producto
// Función para actualizar un producto
async function updateProduct(id, image_url, name, category, description, price, amount, vat_rate, discount) {
    try {
        const response = await fetch(`https://api-89ls.onrender.com/product/save/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                image_url: image_url,
                name: name,
                category: category,
                description: description,
                price: price,
                amount: amount,
                vat_rate: vat_rate,
                discount: discount
            })
        });
        if (!response.ok) {
            throw new Error("No se pudo actualizar el producto");
        }
        return await response.json();
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        throw error;
    }
}

export const apiConnection = {
    productList,
    sendProduct,
    sendOnlineProduct,
    deleteProduct,
    deleteOnlineProduct,
    updateProduct
};
