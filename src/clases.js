import crypto from "crypto"
import fs from "fs"

class ProductManager {

    constructor(path) {
        this.path = path
        this.products = []
        const productsString = fs.readFileSync(this.path, "utf-8")
        const products = JSON.parse(productsString)
        this.products = products
    }

    async addProduct(objProduct) {
        let idd = crypto.randomUUID()
        let propiedades = Object.keys(objProduct)
        let argunmentos = propiedades.length
        if (argunmentos < 6) {
            return console.log("Faltan argumentos")
        }

        const existCode = await this.products.some(product => product.code === objProduct.code)
        if (existCode) {
            return console.log("Existe un producto con el campo code repetido")
        }

        objProduct.id = idd
        this.products.push(objProduct)
        const productsString = JSON.stringify(this.products, null, 2)
        fs.writeFileSync(this.path, productsString)
    }

    async getProducts() {
        if (fs.existsSync(this.path)) {
            let productsList = await fs.promises.readFile(this.path, "utf-8")
            productsList = JSON.parse(productsList)
            console.log((productsList))
            return productsList
        } else {
            console.log("Error el archivo no existe")
        }
    }

    async getProductById(id) {
        let productsList = await this.getProducts()
        let existID = productsList.find(e => e.id === id)
        if (existID == undefined) {
            return console.log("not found \n")
        } else return existID
    }

    async deleteProduct(idBorrar) {
        let productDelete = await fs.promises.readFile(this.path, "utf-8")
        productDelete = JSON.parse(productDelete)
        let indexID = productDelete.findIndex(e => e.id == idBorrar)
        productDelete.splice(indexID, 1)
        fs.writeFileSync(this.path, JSON.stringify(productDelete))
    }

    async updateProduct(idActualizar, campoActualizar, actualizacion) {
        if (campoActualizar == ["title" || "description" || "price" || "thumbnail" || "code" || "stock"]) {
            let productsList = await this.getProducts()
            let existID = productsList.find(e => e.id == idActualizar)
            let indexID = productsList.findIndex(e => e.id == idActualizar)
            if (existID !== undefined) {
                existID[campoActualizar] = actualizacion
                this.products.splice(indexID, 1, existID)
                fs.writeFileSync(this.path, JSON.stringify(this.products))
            }
        } else if (campoActualizar == "id") {
            console.log("no se puede cambiar el ID")
        } else {
            console.log("no soy un campo")
        }
    }
}

export const productos = new ProductManager("./productos.json")

//productos.addProduct({ "title": "Manzana", "description": "Roja", "price": 200, "thumbnail": "Prueba", "code": 7459, "stock": 200 })
// productos.addProduct("ManzanaVerde", "Verde", 500, "Prueba", 134, 200)
// productos.addProduct("Uva", "Violeta", 986, "Prueba", 23, 200)
// productos.addProduct("Mandarina", "Naranja", 75, "Prueba", 9, 200)
// productos.addProduct("Naranja", "Naranja", 850, "Prueba", 98, 200)

//productos.getProducts()
//productos.getProductById("915699fb-3874-47d0-ab6c-89da9394d32d")
//productos.updateProduct("915699fb-3874-47d0-ab6c-89da9394d32d", "title", "Banana")