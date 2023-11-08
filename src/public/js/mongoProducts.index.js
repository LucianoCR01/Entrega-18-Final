///----------FETCH CART----------
const formcarrito = document.getElementById("form-Carrito");
const inputCarrito = document.getElementById("inputCarrito")

formcarrito.onsubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("cart-id", inputCarrito.value)
    formcarrito.reset();
};


let cartId = localStorage.getItem("cart-id");
const API_URL = "http://localhost:8080";

function putIntoCart(_id) {
    cartId = localStorage.getItem("cart-id");
    const url = API_URL + "/api/carts/" + cartId + "/products/" + _id;
    const data = {};
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(url, options)
        .then((response) => response.json())
        .then((res) => {
            console.log(res);
            alert("added");
        })
        .catch((error) => {
            console.error("Error:", error);
            alert(JSON.stringify(error));
        });
}

if (!cartId) {
    alert("no id");
    const url = API_URL + "/api/carts";
    const data = { quantity: 1 };
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            console.log("Response:", data);
            const cartId = localStorage.setItem("cart-id", data._id);
        })
        .catch((error) => {
            console.error("Error:", error);
            alert(JSON.stringify(error));
        });
}