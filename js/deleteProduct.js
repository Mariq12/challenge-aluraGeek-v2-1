import { apiConnection } from "./apiConnection.js";
import { showProductsInTablet } from "./showProductTablet.js";

const listOfItems = document.querySelector('[data-tablet]');

listOfItems.addEventListener('click', async (e) => {
    e.preventDefault();

    const itemId = e.target.dataset.id;
    console.log(itemId);

    if (e.target.nodeName === 'IMG' && e.target.dataset.remove) {
        try {
            let itemDeleted = await apiConnection.deleteProduct(itemId);
            showProductsInTablet();
            window.location.reload(); // Recargar la página después de eliminar el producto
        } catch (error) {
            console.error(`Error al eliminar el producto con ID ${itemId}:`, error);
            alert(`No se pudo eliminar el producto con ID ${itemId}`);
        }
    }
});