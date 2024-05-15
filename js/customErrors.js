export const errortypes = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "tooShort",
];

export const message = {
    name: {
        valueMissing: "El field name no puede estar vacío.",
        patternMismatch: "Por favor, ingrese un name válido.",
        tooShort: "El name debe tener al menos 3 caracteres.",
    },
    category: {
        valueMissing: "Por favor, seleccione una categoría.",
    },
    price: {
        valueMissing: "El field price no puede estar vacío.",
        tooShort: "El price mínimo es 1.",
    },
    amount: {
        valueMissing: "El field amount no puede estar vacío.",
        tooShort: "La amount mínima es 1.",
    },
    vat_rate: {
        valueMissing: "Por favor, seleccione un tipo de IVA.",
    },
    discount: {
        valueMissing: "El field discount no puede estar vacío.",
        tooShort: "El discount mínimo es 1.",
    },
    url: {
        valueMissing: "El field URL no puede estar vacío.",
        typeMismatch: "Por favor, ingrese una URL válida.",
        tooShort: "La URL debe tener al menos 3 caracteres.",
    },
};
