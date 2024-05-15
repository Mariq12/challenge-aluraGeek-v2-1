import { apiConnection } from "./apiConnection.js";
import { showProducts } from "./showProduct.js";

const listOfItems = document.querySelector('[data-lista]')

listOfItems.addEventListener('click', async (e) => {
    e.preventDefault()
  
    const itemId = e.target.dataset.id
    
    if (e.target.nodeName === 'IMG' && e.target.dataset.remove) {
      let itemDeleted = await apiConnection.deleteOnlineProduct(itemId)
      showProducts()
    }
  })


/*import { apiConnection } from "./apiConnection.js";
import { showProducts } from "./showProduct.js";

const listOfItems = document.querySelector('[data-lista]');
const messageContainer = document.querySelector('.message-container');

listOfItems.addEventListener('click', async (e) => {
    e.preventDefault();
  
    const itemId = e.target.dataset.id;
    
    if (e.target.nodeName === 'IMG' && e.target.dataset.remove) {
        try {
            let itemDeleted = await apiConnection.deleteOnlineProduct(itemId);
            showProducts();
            showMessage(`El producto con ID ${itemId} ha sido eliminado.`);
        } catch (error) {
            showMessage(`Error al eliminar el producto con ID ${itemId}.`);
        }
    }
});

function showMessage(message) {
    messageContainer.textContent = message;
    messageContainer.style.display = 'block';
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 3000); // El mensaje desaparece después de 3 segundos
}*/




/*import { apiConnection } from "./apiConnection.js";
import { showProducts } from "./showProduct.js";

const listOfItems = document.querySelector('[data-lista]')

listOfItems.addEventListener('click', async (e) => {
    e.preventDefault()
  
    const itemId = e.target.dataset.id
    
    if (e.target.nodeName === 'IMG' && e.target.dataset.remove) {
      let itemDeleted = await apiConnection.deleteOnlineProduct(itemId)
      showProducts()
    }
  })*/