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

// Captura los datos del formulario
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts.sendProduct(name, price, image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
})

render();