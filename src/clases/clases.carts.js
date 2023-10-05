import fs from "fs"
import crypto from "crypto"

class CartsManager {
    constructor(path) {
        this.path = path
        this.carts = []
        const cartsString = fs.readFileSync(this.path, "utf-8")
        const carts = JSON.parse(cartsString)
        this.carts = carts
    }

    async #writeFile(data) {
        fs.writeFileSync(this.path, JSON.stringify(data, null, 2))
    }

    async #readFile() {
        const readProducts = await fs.promises.readFile("./DB/productos.json", "utf-8")
        return JSON.parse(readProducts)
    }

    newCart() {
        let id = crypto.randomUUID()
        const cart = {
            idCarrito: id,
            productos: []
        }
        this.carts.push(
            cart
        );
        this.#writeFile(this.carts)
    }

    getCart(idCart) {
        const cartSearch = this.carts.find(ca => ca.idCarrito == idCart)
        if (cartSearch) {
            return cartSearch
        }
        return "No se encontro el carrito con ese ID"
    }

    async agregarProductos(idCart, idProduct) {
        let data = await this.#readFile()
        const cartSearch = this.carts.find(ca => ca.idCarrito == idCart)
        const prodSearch = data.find(pr => pr.id == idProduct)
        if (cartSearch && prodSearch) {
            let prodAcortado = cartSearch.productos
            let busProd = prodAcortado.find(pr => pr.id == idProduct)
            let busProdIndex = this.carts.findIndex(bu => bu.idCarrito == idCart)
            if (busProd) {
                busProd.quantity++
            } else {
                prodAcortado.push({ "id": idProduct, "quantity": 1 })
            }
            cartSearch.productos = prodAcortado
            this.carts.slice(busProdIndex, 1, cartSearch)
            this.#writeFile(this.carts)
        } else {
            console.log("Verifique que los ID sean correctos")
        }
    }

}
export const carts = new CartsManager("./DB/carts.json")