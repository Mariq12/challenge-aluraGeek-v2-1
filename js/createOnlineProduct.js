import { apiConnection } from "./apiConnection.js";

const form = document.querySelector("[data-form]");

// Función para manejar el envío del Form
async function createOnlineProduct(evento) {
    evento.preventDefault(); // Evita que el Form se envíe de manera tradicional

    // Obtener los valores del Form
    const image_url = document.querySelector("[data-url]").value;
    const name = document.querySelector("[data-name]").value;
    const category = document.querySelector("[data-category]").value;
    const description = document.querySelector("[data-description]").value;
    const price = parseFloat(document.querySelector("[data-price]").value);
    const amount = parseFloat(document.querySelector("[data-amount]").value);
    const vat_rate = document.querySelector("[data-vat_rate]").value;
    const discount = parseFloat(document.querySelector("[data-discount]").value);

    try {
       await apiConnection.sendOnlineProduct(image_url, name, category, description, price, amount, vat_rate, discount);
        
        // Redirigir a la página de confirmación
        window.location.href = "../pages/product-registered.html";
    } catch (error) {
        console.error("Error al send el Form:", error);
        alert("Ocurrió un error al registrar el product. Por favor, inténtalo de nuevo más tarde.");
    }
}

// Escuchar el evento submit del Form y llamar a la función sendForm
form.addEventListener("submit",evento => createOnlineProduct(evento)); 
