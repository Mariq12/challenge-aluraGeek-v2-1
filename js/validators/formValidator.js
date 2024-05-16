import { errortypes, messages } from "../err/customError.js";

const FormFields = document.querySelectorAll("[required]");
const Form = document.querySelector("[data-form]");
const sendButton = document.getElementById("send");
const deleteButton = document.getElementById("delete"); // Suponiendo que tienes un botón de eliminar

Form.addEventListener("submit", (e) => {
    e.preventDefault();

    let firstErrorField = null; // Variable para almacenar el primer campo con error
    let formIsValid = true; // Variable para verificar si el formulario es válido

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
            formIsValid = false; // El formulario no es válido si hay algún campo vacío o con error
            if (!firstErrorField) {
                firstErrorField = field; // Almacena el primer campo con error
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
    //window.location.reload(); // Recargar la página después de enviar el formulario
});

sendButton.addEventListener("click", (e) => {
    let formIsValid = true; // Variable para verificar si el formulario es válido
    let firstErrorField = null; // Variable para almacenar el primer campo con error

    // Validar todos los campos antes de enviar el formulario
    FormFields.forEach((field) => {
        const errorMessage = field.parentNode.querySelector(".error-message");
        const fieldName = field.getAttribute("name");
        let message = "";

        if (!field.value.trim()) {
            message = messages[fieldName].valueMissing || "Este campo es requerido.";
            formIsValid = false; // El formulario no es válido si hay algún campo vacío
            if (!firstErrorField) {
                firstErrorField = field; // Almacena el primer campo con error
            }
        } else if (fieldName === "name" && (field.value.length < 3 || field.value.length > 100)) {
            message = messages[fieldName].tooShort || "El nombre debe tener entre 3 y 100 caracteres.";
            formIsValid = false; // El formulario no es válido si hay algún campo con error
            if (!firstErrorField) {
                firstErrorField = field; // Almacena el primer campo con error
            }
        } else if (field.type === "url" && !isURLValid(field.value)) {
            message = messages[fieldName].typeMismatch || messages[fieldName].valueMissing;
            formIsValid = false; // El formulario no es válido si hay algún campo con error
            if (!firstErrorField) {
                firstErrorField = field; // Almacena el primer campo con error
            }
        }

        if (message) {
            errorMessage.textContent = message;
        } else {
            errorMessage.textContent = ""; // Borra el mensaje de error solo si el campo es válido
        }
    });

    // Evitar el envío del formulario si algún campo no es válido
    if (!formIsValid) {
        e.preventDefault();
        if (firstErrorField) {
            firstErrorField.focus();
        }
    } else {
        Form.submit(); // Envía el formulario si todos los campos son válidos
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
    let fieldName = field.getAttribute("name"); // Obtener el nombre del campo
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
    // Expresión regular para validar una URL
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
}



/*import { errortypes, messages } from "../err/customError.js";

const FormFields = document.querySelectorAll("[required]");
const Form = document.querySelector("[data-form]");
const sendButton = document.getElementById("send");
const deleteButton = document.getElementById("delete"); // Suponiendo que tienes un botón de eliminar

Form.addEventListener("submit", (e) => {
    e.preventDefault();

    let firstErrorField = null; // Variable para almacenar el primer campo con error
    let formIsValid = true; // Variable para verificar si el formulario es válido

    // Validar todos los campos antes de enviar el formulario
    FormFields.forEach((field) => {
        const errorMessage = field.parentNode.querySelector(".error-message");
        const fieldName = field.getAttribute("name");
        let message = "";

        if (!field.value.trim()) {
            message = messages[fieldName].valueMissing || "Este campo es requerido.";
        } else if (field.type === "name" && field.value.length >= 3) {
            message = messages[fieldName].tooShort || messages[fieldName].valueMissing;
        } else if (field.type === "url" && !isURLValid(field.value)) {
            message = messages[fieldName].typeMismatch || messages[fieldName].valueMissing;
        }

        if (message) {
            errorMessage.textContent = message;
            formIsValid = false; // El formulario no es válido si hay algún campo vacío o con error
            if (!firstErrorField) {
                firstErrorField = field; // Almacena el primer campo con error
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
    //window.location.reload(); // Recargar la página después de enviar el formulario
});

sendButton.addEventListener("click", (e) => {
    let formIsValid = true; // Variable para verificar si el formulario es válido
    let firstErrorField = null; // Variable para almacenar el primer campo con error

    // Validar todos los campos antes de enviar el formulario
    FormFields.forEach((field) => {
        const errorMessage = field.parentNode.querySelector(".error-message");
        const fieldName = field.getAttribute("name");
        let message = "";

        if (!field.value.trim()) {
            message = messages[fieldName].valueMissing || "Este campo es requerido.";
            formIsValid = false; // El formulario no es válido si hay algún campo vacío
            if (!firstErrorField) {
                firstErrorField = field; // Almacena el primer campo con error
            }
        } else if (field.type === "name" && field.value.length < 3) {
            message = messages[fieldName].tooShort || messages[fieldName].valueMissing;
            formIsValid = false; // El formulario no es válido si hay algún campo con error
            if (!firstErrorField) {
                firstErrorField = field; // Almacena el primer campo con error
            }
        } else if (field.type === "url" && !isURLValid(field.value)) {
            message = messages[fieldName].typeMismatch || messages[fieldName].valueMissing;
            formIsValid = false; // El formulario no es válido si hay algún campo con error
            if (!firstErrorField) {
                firstErrorField = field; // Almacena el primer campo con error
            }
        }

        if (message) {
            errorMessage.textContent = message;
        } else {
            errorMessage.textContent = ""; // Borra el mensaje de error solo si el campo es válido
        }
    });

    // Evitar el envío del formulario si algún campo no es válido
    if (!formIsValid) {
        e.preventDefault();
        if (firstErrorField) {
            firstErrorField.focus();
        }
    } else {
        Form.submit(); // Envía el formulario si todos los campos son válidos
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
    let fieldName = field.getAttribute("name"); // Obtener el nombre del campo
    field.setCustomValidity("");

    if (field.type === "url" && !isURLValid(field.value)) {
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
    // Expresión regular para validar una URL
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
}
*/


/*import { errortypes, messages } from "../err/customError.js";

const FormFields = document.querySelectorAll("[required]");
const Form = document.querySelector("[data-form]");
const sendButton = document.getElementById("send");
const deleteButton = document.getElementById("delete");

Form.addEventListener("submit", (e) => {
    e.preventDefault();

    let firstErrorField = null; // Variable para almacenar el primer campo con error
    let formIsValid = true; // Variable para verificar si el formulario es válido

    // Validar todos los campos antes de enviar el formulario
    FormFields.forEach((field) => {
        const errorMessage = field.parentNode.querySelector(".error-message");
        const fieldName = field.getAttribute("name");
        let message = "";

        if (!field.value.trim()) {
            message = messages[fieldName].valueMissing || "Este campo es requerido.";
        } else if (field.type === "name" && field.value.length < 3) {
            message = messages[fieldName].tooShort || messages[fieldName].valueMissing;
        } else if (field.type === "url" && !isURLValid(field.value)) {
            message = messages[fieldName].typeMismatch || messages[fieldName].valueMissing;
        }

        if (message) {
            errorMessage.textContent = message;
            formIsValid = false; // El formulario no es válido si hay algún campo vacío o con error
            if (!firstErrorField) {
                firstErrorField = field; // Almacena el primer campo con error
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
    //window.location.reload(); // Recargar la página después de enviar el formulario
});

sendButton.addEventListener("click", (e) => {
    // No hacemos nada aquí, ya que el evento submit en el formulario manejará la validación
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
    let fieldName = field.getAttribute("name"); // Obtener el nombre del campo
    field.setCustomValidity("");

    if (field.type === "url" && !isURLValid(field.value)) {
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
    // Expresión regular para validar una URL
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
}

*/


/*import { errortypes, messages } from "../err/customError.js";

const FormFields = document.querySelectorAll("[required]");
const Form = document.querySelector("[data-form]");
const sendButton = document.getElementById("send");

Form.addEventListener("submit", (e) => {
    e.preventDefault();

    let firstErrorField = null; // Variable para almacenar el primer campo con error

    // Validar todos los campos antes de enviar el formulario
    FormFields.forEach((field) => {
        const errorMessage = field.parentNode.querySelector(".error-message");
        const fieldName = field.getAttribute("name");
        let message = "";

        if (!field.value.trim()) {
            message = messages[fieldName].valueMissing || "Este campo es requerido.";
        } else if (field.type === "name" && field.value.length >= 3) {
            message = messages[fieldName].tooShort || messages[fieldName].valueMissing;
        } else if (field.type === "url" && !isURLValid(field.value)) {
            message = messages[fieldName].typeMismatch || messages[fieldName].valueMissing;
        }

        if (message) {
            errorMessage.textContent = message;
            if (!firstErrorField) {
                firstErrorField = field; // Almacena el primer campo con error
            }
        } else {
            errorMessage.textContent = "";
        }
    });

    // Si hay un campo con error, enfocarlo y mostrar el mensaje de error
    if (firstErrorField) {
        firstErrorField.focus();
        return;
    }

    // Si todos los campos están llenos y válidos, realizar el envío del formulario aquí
    const listaRespuestas = {
        name: e.target.elements["name"].value,
        price: e.target.elements["price"].value,
        image: e.target.elements["image"].value
    };

    localStorage.setItem("registro", JSON.stringify(listaRespuestas));
    //window.location.reload(); // Recargar la página después de enviar el formulario
});


sendButton.addEventListener("click", (e) => {
    let formIsValid = true; // Variable para verificar si el formulario es válido

    // Validar todos los campos antes de enviar el formulario
    FormFields.forEach((field) => {
        const errorMessage = field.parentNode.querySelector(".error-message");
        const fieldName = field.getAttribute("name");
        if (!field.value.trim()) {
            errorMessage.textContent = messages[fieldName].valueMissing || "Este campo es requerido.";
            formIsValid = false; // El formulario no es válido si hay algún campo vacío
        } else {
            errorMessage.textContent = "";
        }
    });

    // Evitar el envío del formulario si algún campo no es válido
    if (!formIsValid) {
        e.preventDefault();
    }
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
*/


/*import { errortypes, messages } from "../err/customError.js";

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
    let formIsValid = true; // Variable para verificar si el formulario es válido

    // Validar todos los campos antes de enviar el formulario
    FormFields.forEach((field) => {
        const errorMessage = field.parentNode.querySelector(".error-message");
        const fieldName = field.getAttribute("name");
        if (!field.value.trim()) {
            errorMessage.textContent = messages[fieldName].valueMissing || "Este campo es requerido.";
            formIsValid = false; // El formulario no es válido si hay algún campo vacío
        } else {
            errorMessage.textContent = "";
        }
    });

    // Evitar el envío del formulario si algún campo no es válido
    if (!formIsValid) {
        e.preventDefault();
    }
});

FormFields.forEach((field) => {
    field.addEventListener("blur", () => verificarfield(field));
    field.addEventListener("invalid", (evento) => evento.preventDefault());
});

function verificarfield(field) {
    let message = "";
    //let fieldName; // Declarar fieldName fuera del bucle forEach
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
*/