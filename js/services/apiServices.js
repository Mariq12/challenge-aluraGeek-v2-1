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
            throw err;
        });
}

const sendProduct = (name, price, image) => {
    return fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            price,
            image,
        })
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));{
    };
}

const deleteProduct = (id) => {
    return fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));{
    };
}

export const servicesProducts = {
    productList, 
    sendProduct,
    deleteProduct
};