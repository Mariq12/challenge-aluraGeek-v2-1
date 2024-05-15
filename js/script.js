import { errortypes, message } from "./customErrors.js";

const FormFields = document.querySelectorAll("[required]");
const Form = document.querySelector("[data-form]");
const sendButton = document.getElementById("send");

Form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validar todos los fields antes de send el Form
  FormFields.forEach((field) => {
    const errorMessage = field.parentNode.querySelector(".error-message");
    const fieldName = field.getAttribute("name");
    if (!field.value.trim()) {
      errorMessage.textContent = message[fieldName].valueMissing || "Este field es requerido.";
    } else {
      errorMessage.textContent = "";
    }
  });

  // Validar si se ha seleccionado una categoría
  const categorySelect = document.getElementById("category");
  const errorMessagecategory = categorySelect.parentNode.querySelector(".error-message");
  if (!categorySelect.value) {
    errorMessagecategory.textContent = message.category.valueMissing || "Por favor, seleccione una categoría.";
    return; // Detener el envío del Form si no se ha seleccionado una categoría
  }
  errorMessagecategory.textContent = "";

  // Validar si se ha seleccionado un tipo de IVA
  const tipoIvaSelect = document.getElementById("vat_rate");
  const errorMessageIva = tipoIvaSelect.parentNode.querySelector(".error-message");
  if (!tipoIvaSelect.value) {
    errorMessageIva.textContent = message.vat_rate.valueMissing || "Por favor, seleccione un tipo de IVA.";
    return; // Detener el envío del Form si no se ha seleccionado un tipo de IVA
  }
  errorMessageIva.textContent = "";

  // Si todos los fields están llenos y se han seleccionado las opciones requeridas, send el Form
  const listaRespuestas = {
    name: e.target.elements["name"].value,
    category: e.target.elements["category"].value,
    price: e.target.elements["price"].value,
    amount: e.target.elements["amount"].value,
    vat_rate: e.target.elements["vat_rate"].value,
    discount: e.target.elements["discount"].value,
    image_url: e.target.elements["image_url"].value
  };

  localStorage.setItem("registro", JSON.stringify(listaRespuestas));
  window.location.href = "../pages/product-registered.html";
});

sendButton.addEventListener("click", (e) => {
  // Validar todos los fields antes de send el Form
  FormFields.forEach((field) => {
    const errorMessage = field.parentNode.querySelector(".error-message");
    const fieldName = field.getAttribute("name");
    if (!field.value.trim()) {
      errorMessage.textContent = message[fieldName].valueMissing || "Este field es requerido.";
    } else {
      errorMessage.textContent = "";
    }
  });

  // Validar si se ha seleccionado una categoría
  const categorySelect = document.getElementById("category");
  const errorMessagecategory = categorySelect.parentNode.querySelector(".error-message");
  if (!categorySelect.value) {
    errorMessagecategory.textContent = message.category.valueMissing || "Por favor, seleccione una categoría.";
  } else {
    errorMessagecategory.textContent = "";
  }

  // Validar si se ha seleccionado un tipo de IVA
  const tipoIvaSelect = document.getElementById("vat_rate");
  const errorMessageIva = tipoIvaSelect.parentNode.querySelector(".error-message");
  if (!tipoIvaSelect.value) {
    errorMessageIva.textContent = message.vat_rate.valueMissing || "Por favor, seleccione un tipo de IVA.";
  } else {
    errorMessageIva.textContent = "";
  }

  // Evitar el envío del Form si algún field no es válido
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
  field.setCustomValidity("");
  // fields validity
  errortypes.forEach((error) => {
    if (field.validity[error]) {
      const fieldName = field.getAttribute("name");
      message = message[fieldName][error];
    }
  });

  const errorMessage = field.parentNode.querySelector(".error-message");
  const validarInputCheck = field.checkValidity();

  if (!validarInputCheck && message) {
    errorMessage.textContent = message;
  } else {
    errorMessage.textContent = "";
  }
}