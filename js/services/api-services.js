const productList = () => {
    return fetch("http://localhost:3000/products")
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .catch((err) => {
            console.error('Error fetching products:', err);
            throw err; // Re-lanzar el error para que pueda ser manejado en el lugar donde se llama a productList
        });
}

export const servicesProducts = {
    productList
};



/*const productList = () => {
    return fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((err) => console.log(err));
}

export const servicesProducts = {
    productList
}
*/