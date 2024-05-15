import { apiConnection } from "./apiConnection.js";
import { showProductsInTablet } from "./showProductTablet.js";

const listOfItems = document.querySelector('[data-tablet]');

listOfItems.addEventListener('click', async (e) => {
    e.preventDefault();

    const target = e.target;
    const itemId = target.dataset.id;

    if (target.nodeName === 'IMG') {
        if (target.dataset.edite) {
            console.log(`Click en editar: ${itemId}`);
            try {
                // Obtener los datos del producto a partir del ID
                const product = await apiConnection.getProductById(itemId);

                // Guardar los datos del producto en localStorage
                localStorage.setItem('productToEdit', JSON.stringify(product));

                // Redirigir a update.html
                window.location.href = '/pages/update.html';
            } catch (error) {
                console.error("Error al obtener el producto:", error);
                alert("No se pudo obtener el producto");
            }
        } else if (target.dataset.remove) {
            console.log(`Click en eliminar: ${itemId}`);
            try {
                // Eliminar el producto a partir del ID
                await apiConnection.deleteProduct(itemId);
                alert('Producto eliminado con éxito');
                showProductsInTablet(); // Actualizar la lista de productos
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                alert("No se pudo eliminar el producto");
            }
        }
    }
});

async function getProductById(id) {
    try {
        const response = await fetch(`https://api-89ls.onrender.com/product/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        throw error;
    }
}

apiConnection.getProductById = getProductById;
