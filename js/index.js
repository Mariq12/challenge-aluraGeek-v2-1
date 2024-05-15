// Obtener todos los iconos de delete
const deleteIcons = document.querySelectorAll('.card-container--value img');

// Iterar sobre cada icono de delete
deleteIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const figcaption = icon.parentNode;
        const figure = figcaption.parentNode;
        const article = figure.parentNode;
        article.remove();
    });
});
