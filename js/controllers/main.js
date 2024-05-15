import { servicesProducts } from "../services/apiServices.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

// Función para crear una tarjeta de productos
function createCard(name, price, image, id) {
    const card = document.createElement("article");
    card.innerHTML = `
    <figure class="card">
    <img class="card-container--img"
        aspect-ratio: auto
        height="60px"
        src="${image}"
        alt="${name}">
    <figcaption class="card-container--info">
        <p class="card-container--title">${name}</p>
        <div class="card-container--value">
            <p>$ ${price}</p>
            <img class="card-container--icon" src="./assets/icons/borrar.png" data-remove="true" data-id="${id}"/>
        </div>
    </figcaption>
</figure>
        </figure>
    `;
    return card;
}

const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        if (listProducts && Array.isArray(listProducts)) {
            listProducts.forEach(product => {
                productContainer.appendChild(
                    createCard(
                        product.name,
                        product.price,
                        product.image,
                        product.id
                    )
                );
            });
        } else {
            console.error('Expected an array of products, but got:', listProducts);
        }
    } catch (error) {
        console.error('Error in render function:', error);
    }
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = form.querySelector("[data-name]").value;
    const price = form.querySelector("[data-price]").value;
    const image = form.querySelector("[data-image]").value;

    console.log(name);
    console.log(price);
    console.log(image);
})

render();