
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
    };

    socket.emit("newProduct", newProduct);
    formProducts.reset();
};

socket.on("listProdSocke", listProdSocke => {
})

formeliminar.onsubmit = (e) => {
    e.preventDefault();
    console.log(inputEliminar.value)
    socket.emit("inputEliminar", inputEliminar.value);
    formeliminar.reset();
};

socket.on("delProdSocke", delProdSocke => {
    //window.location.reload();
    let tabla = document.getElementById("tabla")

    function mostrarTabla() {
        console.log("hola")
        fetch("C:/Users/Luciano/Desktop/Entrega-3/DB/productos.json")
            .then(data => data.json())
            .then(data2 => {
                console.log(data2)
                dibujarTabla(data2)
            })
    }

    function dibujarTabla(datos) {
        tabla.innerHTML = ""
        for (let valor of datos) {
            tabla.innerHTML += `
            <tr>
                <th>${valor.title}</th>
            </tr>
            `
        }
    }
})