import { apiConnection } from "./apiConnection.js";

const productListContainer = document.querySelector("[data-lista]");

// Función para crear una tarjeta de producto en el DOM
function createCard(id, image_url, name, price, category) {
    const newCard = document.createElement("article");
    newCard.innerHTML = `
        <figure class="card" alt="${category}">
            <img class="card-container--img"
                aspect-ratio: auto
                height="60px"
                src="${image_url}"
                alt="${category}">
            <figcaption class="card-container--info">
                <p class="card-container--title">${name}</p>
                <div class="card-container--value">
                    <p>$ ${price.toFixed(2)}</p>
                    <img class="card-container--icon" src="./assets/icons/borrar.png" data-remove="true" data-id="${id}"/>
                </div>
            </figcaption>
        </figure>
    `;
    return newCard;
}

// Función para mostrar productos dependiendo del servidor seleccionado por el usuario
export async function showProducts() {
    try {
        let apiUrl = "";
        const useOnlineServer = confirm("¿Desea usar el servidor en línea?");

        if (useOnlineServer) {
            apiUrl = "https://api-89ls.onrender.com/product/all";
        } else {
            apiUrl = "http://localhost:3001/product";
        }

        const listAPI = await apiConnection.productList(apiUrl);
        listAPI.forEach(product => {
            productListContainer.appendChild(createCard(product.id, product.image_url, product.name, product.price, product.category));
        });
    } catch (error) {
        console.error("Error al obtener y mostrar los productos:", error);
        alert("No es posible registrar los productos en el servidor local");
    }
}

showProducts();