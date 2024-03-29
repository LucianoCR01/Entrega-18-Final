//Codigo del FRONT
const socket = io()

const formProducts = document.getElementById("form-products");
const inputTitle = document.getElementById("form-title");
const inputDescript = document.getElementById("form-description");
const inputPrice = document.getElementById("form-price");
const inputCode = document.getElementById("form-code");
const inputStock = document.getElementById("form-stock");
const inputCategory = document.getElementById("form-category");
const inputThumbnail = document.getElementById("form-thumbnail");

const formeliminar = document.getElementById("form-eliminar");
const inputEliminar = document.getElementById("inputEliminar")

let userMail = localStorage.getItem("userMail")

formProducts.onsubmit = (e) => {
    e.preventDefault();
    const newProduct = {
        title: inputTitle.value,
        description: inputDescript.value,
        price: +inputPrice.value,
        picture: inputThumbnail.value,
        code: inputCode.value,
        stock: +inputStock.value,
        category: inputCategory.value,
        owner: userMail
    };

    socket.emit("newProduct", newProduct);
    formProducts.reset();
};

socket.on("listProdSocke", listProdSocke => {
    let tabla = document.getElementById("tabla")
    document.getElementById("btnAddProduct").addEventListener("click", mostrarTabla)
    function mostrarTabla() {
        fetch("http://localhost:8080/api/products")
            .then(function (res) {
                return res.json()
            })
            .then(function (datos) {
                dibujarTabla(datos.data)
            })
    }

    function dibujarTabla(datos) {
        tabla.innerHTML = "";
        for (let valor of datos) {
            tabla.innerHTML += `
            <ul>
                <li>Nombre : ${valor.title}</li>
                <li>Descripcion : ${valor.description}</li>
                <li>Precio : ${valor.price}</li>
                <li>Code : ${valor.code}</li>
                <li>Stock : ${valor.stock}</li>
                <li>Categoria : ${valor.category}</li>
                <li>Imagen : <img src="${valor.picture}" alt="${valor.title}" width="50"></li>
                <li>ID : ${valor.id}</li>
                <br />
            </ul>
            `
        }
    }
})

formeliminar.onsubmit = (e) => {
    e.preventDefault();
    const prodEliminar = {
        id_Eliminar: inputEliminar.value,
        userMail: userMail
    }
    socket.emit("inputEliminar", prodEliminar);
    formeliminar.reset();
};

socket.on("delProdSocke", findProd => {
    let tabla = document.getElementById("tabla")
    document.getElementById("btnEliminar").addEventListener("click", mostrarTabla)
    function mostrarTabla() {
        fetch("http://localhost:8080/api/products")
            .then(function (res) {
                return res.json()
            })
            .then(function (datos) {
                dibujarTabla(datos.data)
            })
    }
    function dibujarTabla(datos) {
        tabla.innerHTML = "";
        for (let valor of datos) {
            tabla.innerHTML += `
            <ul>
                <li>Nombre : ${valor.title}</li>
                <li>Descripcion : ${valor.description}</li>
                <li>Precio : ${valor.price}</li>
                <li>Code : ${valor.code}</li>
                <li>Stock : ${valor.stock}</li>
                <li>Categoria : ${valor.category}</li>
                <li>Imagen : <img src="${valor.picture}" alt="${valor.title}" width="50"></li>
                <li>ID : ${valor.id}</li>
                <br />
            </ul>
            `
        }
    }
})
