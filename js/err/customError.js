export const errortypes = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "tooShort",
];

export const messages = {
    name: {
        valueMissing: "El campo nombre no puede estar vacío.",
        patternMismatch: "Por favor, ingrese un nombre válido.",
        tooShort: "El nombre debe tener al menos 3 caracteres.",
    },
    price: {
        valueMissing: "El campo precio no puede estar vacío.",
        tooShort: "El precio mínimo es 1.",
    },
    image: {
        valueMissing: "El campo URL no puede estar vacío.",
        typeMismatch: "Por favor, ingrese una URL válida.",
        tooShort: "La URL debe tener al menos 3 caracteres.",
    },
};