import { errortypes, messages } from "../err/customError.js";

const FormFields = document.querySelectorAll("[required]");
const Form = document.querySelector("[data-form]");
const sendButton = document.getElementById("send");

Form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar el formulario
    FormFields.forEach((field) => {
        const errorMessage = field.parentNode.querySelector(".error-message");
        const fieldName = field.getAttribute("name");
        if (!field.value.trim()) {
            errorMessage.textContent = messages[fieldName].valueMissing || "Este campo es requerido.";
        } else {
            errorMessage.textContent = "";
        }
    });

    // Si todos los campos están llenos y se han seleccionado las opciones requeridas, enviar el formulario
    const listaRespuestas = {
        name: e.target.elements["name"].value,
        price: e.target.elements["price"].value,
        image: e.target.elements["image"].value
    };

    localStorage.setItem("registro", JSON.stringify(listaRespuestas));
    window.location.reload();
});

sendButton.addEventListener("click", (e) => {
    // Validar todos los campos antes de enviar el formulario
    FormFields.forEach((field) => {
        const errorMessage = field.parentNode.querySelector(".error-message");
        const fieldName = field.getAttribute("name");
        if (!field.value.trim()) {
            errorMessage.textContent = messages[fieldName].valueMissing || "Este campo es requerido.";
        } else {
            errorMessage.textContent = "";
        }
    });

    // Evitar el envío del formulario si algún campo no es válido
    FormFields.forEach((field) => {
        if (!field.value.trim()) {
            e.preventDefault();
        }
    });
});

FormFields.forEach((field) => {
    field.addEventListener("blur", () => verificarfield(field));
    field.addEventListener("invalid", (evento) => evento.preventDefault());
});

function verificarfield(field) {
    let message = "";
    let fieldName; // Declarar fieldName fuera del bucle forEach
    field.setCustomValidity("");
    errortypes.forEach((error) => {
        if (field.validity[error]) {
            fieldName = field.getAttribute("name"); // Asignar valor a fieldName dentro del bucle
            message = messages[fieldName][error];
        }
    });

    if (field.type === "url" && !isURLValid(field.value)) {
        message = messages[fieldName].typeMismatch || messages[fieldName].valueMissing;
    }

    const errorMessage = field.parentNode.querySelector(".error-message");
    const validarInputCheck = field.checkValidity();

    if (!validarInputCheck && message) {
        errorMessage.textContent = message;
    } else {
        errorMessage.textContent = "";
    }
}

function isURLValid(url) {
    // Expresión regular para validar una URL
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
}
