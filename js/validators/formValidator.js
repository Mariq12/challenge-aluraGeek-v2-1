import { errortypes, messages } from "../err/customError.js";

const FormFields = document.querySelectorAll("[required]");
const Form = document.querySelector("[data-form]");
const sendButton = document.getElementById("send");
const deleteButton = document.getElementById("delete");

Form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let firstErrorField = null; 
    let formIsValid = true;

    // Validar todos los campos antes de enviar el formulario
    for (const field of FormFields) {
        const errorMessage = field.parentNode.querySelector(".error-message");
        const fieldName = field.getAttribute("name");
        let message = "";

        if (!field.value.trim()) {
            message = messages[fieldName].valueMissing || "Este campo es requerido.";
        } else if (fieldName === "name" && (field.value.length < 3 || field.value.length > 100)) {
            message = messages[fieldName].tooShort || "El nombre debe tener entre 3 y 100 caracteres.";
        } else if (field.type === "url" && !(await isURLValid(field.value))) {
            message = messages[fieldName].typeMismatch || messages[fieldName].valueMissing;
        }

        if (message) {
            errorMessage.textContent = message;
            formIsValid = false; 
            if (!firstErrorField) {
                firstErrorField = field;
            }
        } else {
            errorMessage.textContent = "";
        }
    }

    // Si hay un campo con error, enfocarlo y mostrar el mensaje de error
    if (!formIsValid) {
        if (firstErrorField) {
            firstErrorField.focus();
        }
        return;
    }

    // Si todos los campos están llenos y válidos, realizar el envío del formulario aquí
    const listaRespuestas = {
        name: e.target.elements["name"].value,
        price: e.target.elements["price"].value,
        image: e.target.elements["image"].value
    };

    localStorage.setItem("registro", JSON.stringify(listaRespuestas));
    //window.location.reload(); 
});

sendButton.addEventListener("click", async (e) => {
    let formIsValid = true; 
    let firstErrorField = null; 

    // Validar todos los campos antes de enviar el formulario
    for (const field of FormFields) {
        const errorMessage = field.parentNode.querySelector(".error-message");
        const fieldName = field.getAttribute("name");
        let message = "";

        if (!field.value.trim()) {
            message = messages[fieldName].valueMissing || "Este campo es requerido.";
            formIsValid = false; 
            if (!firstErrorField) {
                firstErrorField = field; 
            }
        } else if (fieldName === "name" && (field.value.length < 3 || field.value.length > 100)) {
            message = messages[fieldName].tooShort || "El nombre debe tener entre 3 y 100 caracteres.";
            formIsValid = false; 
            if (!firstErrorField) {
                firstErrorField = field; 
            }
        } else if (field.type === "url" && !(await isURLValid(field.value))) {
            message = messages[fieldName].typeMismatch || messages[fieldName].valueMissing;
            formIsValid = false; 
            if (!firstErrorField) {
                firstErrorField = field;
            }
        }

        if (message) {
            errorMessage.textContent = message;
        } else {
            errorMessage.textContent = "";
        }
    }

    // Evitar el envío del formulario si algún campo no es válido
    if (!formIsValid) {
        e.preventDefault();
        if (firstErrorField) {
            firstErrorField.focus();
        }
    } else {
        Form.submit();
    }
});

deleteButton.addEventListener("click", () => {
    // Limpiar los mensajes de error al hacer clic en el botón de eliminar
    FormFields.forEach((field) => {
        field.parentNode.querySelector(".error-message");
        window.location.reload();
    });
});

FormFields.forEach((field) => {
    field.addEventListener("blur", () => verificarfield(field));
    field.addEventListener("invalid", (evento) => evento.preventDefault());
});

async function verificarfield(field) {
    let message = "";
    let fieldName = field.getAttribute("name");
    field.setCustomValidity("");

    if (fieldName === "name" && (field.value.length < 3 || field.value.length > 100)) {
        message = messages[fieldName].tooShort || "El nombre debe tener entre 3 y 100 caracteres.";
    } else if (field.type === "url" && !(await isURLValid(field.value))) {
        message = messages[fieldName].typeMismatch || messages[fieldName].valueMissing;
    } else {
        errortypes.forEach((error) => {
            if (field.validity[error]) {
                message = messages[fieldName][error];
            }
        });
    }

    const errorMessage = field.parentNode.querySelector(".error-message");
    const validarInputCheck = field.checkValidity();

    if (!validarInputCheck && message) {
        errorMessage.textContent = message;
    } else {
        errorMessage.textContent = "";
    }
}

async function isURLValid(url) {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(url)) {
        return false;
    }

    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    const urlExtension = url.split('.').pop().toLowerCase();
    if (!imageExtensions.includes(urlExtension)) {
        return false;
    }

    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}





/*import { errortypes, messages } from "../err/customError.js";

const FormFields = document.querySelectorAll("[required]");
const Form = document.querySelector("[data-form]");
const sendButton = document.getElementById("send");
const deleteButton = document.getElementById("delete");

Form.addEventListener("submit", (e) => {
    e.preventDefault();

    let firstErrorField = null; 
    let formIsValid = true;

    // Validar todos los campos antes de enviar el formulario
    FormFields.forEach((field) => {
        const errorMessage = field.parentNode.querySelector(".error-message");
        const fieldName = field.getAttribute("name");
        let message = "";

        if (!field.value.trim()) {
            message = messages[fieldName].valueMissing || "Este campo es requerido.";
        } else if (fieldName === "name" && (field.value.length < 3 || field.value.length > 100)) {
            message = messages[fieldName].tooShort || "El nombre debe tener entre 3 y 100 caracteres.";
        } else if (field.type === "url" && !isURLValid(field.value)) {
            message = messages[fieldName].typeMismatch || messages[fieldName].valueMissing;
        }

        if (message) {
            errorMessage.textContent = message;
            formIsValid = false; 
            if (!firstErrorField) {
                firstErrorField = field;
            }
        }
    });

    // Si hay un campo con error, enfocarlo y mostrar el mensaje de error
    if (!formIsValid) {
        if (firstErrorField) {
            firstErrorField.focus();
        }
        return;
    }

    // Si todos los campos están llenos y válidos, realizar el envío del formulario aquí
    const listaRespuestas = {
        name: e.target.elements["name"].value,
        price: e.target.elements["price"].value,
        image: e.target.elements["image"].value
    };

    localStorage.setItem("registro", JSON.stringify(listaRespuestas));
    //window.location.reload(); 
});

sendButton.addEventListener("click", (e) => {
    let formIsValid = true; 
    let firstErrorField = null; 

    // Validar todos los campos antes de enviar el formulario
    FormFields.forEach((field) => {
        const errorMessage = field.parentNode.querySelector(".error-message");
        const fieldName = field.getAttribute("name");
        let message = "";

        if (!field.value.trim()) {
            message = messages[fieldName].valueMissing || "Este campo es requerido.";
            formIsValid = false; 
            if (!firstErrorField) {
                firstErrorField = field; 
            }
        } else if (fieldName === "name" && (field.value.length < 3 || field.value.length > 100)) {
            message = messages[fieldName].tooShort || "El nombre debe tener entre 3 y 100 caracteres.";
            formIsValid = false; 
            if (!firstErrorField) {
                firstErrorField = field; 
            }
        } else if (field.type === "url" && !isURLValid(field.value)) {
            message = messages[fieldName].typeMismatch || messages[fieldName].valueMissing;
            formIsValid = false; 
            if (!firstErrorField) {
                firstErrorField = field;
            }
        }

        if (message) {
            errorMessage.textContent = message;
        } else {
            errorMessage.textContent = "";
        }
    });

    // Evitar el envío del formulario si algún campo no es válido
    if (!formIsValid) {
        e.preventDefault();
        if (firstErrorField) {
            firstErrorField.focus();
        }
    } else {
        Form.submit();
    }
});

deleteButton.addEventListener("click", () => {
    // Limpiar los mensajes de error al hacer clic en el botón de eliminar
    FormFields.forEach((field) => {
        field.parentNode.querySelector(".error-message");
        window.location.reload();
    });
});

FormFields.forEach((field) => {
    field.addEventListener("blur", () => verificarfield(field));
    field.addEventListener("invalid", (evento) => evento.preventDefault());
});

function verificarfield(field) {
    let message = "";
    let fieldName = field.getAttribute("name");
    field.setCustomValidity("");

    if (fieldName === "name" && (field.value.length < 3 || field.value.length > 100)) {
        message = messages[fieldName].tooShort || "El nombre debe tener entre 3 y 100 caracteres.";
    } else if (field.type === "url" && !isURLValid(field.value)) {
        message = messages[fieldName].typeMismatch || messages[fieldName].valueMissing;
    } else {
        errortypes.forEach((error) => {
            if (field.validity[error]) {
                message = messages[fieldName][error];
            }
        });
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
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
}*/