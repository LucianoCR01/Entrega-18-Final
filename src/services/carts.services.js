import CartsModelsMongo from "../dao/mongo/mongoCarts.models.js"

class MongoCartsService {
    constructor() {
        this.mongoCartsService = new CartsModelsMongo()
    }

    createCart = () => {
        const productos = []
        return this.mongoCartsService.createCart(productos)
    }

    findCart = (idCart) => {
        return this.mongoCartsService.findCart(idCart)
    }

    agregatedProduct = (idCart, idProduct) => {
        return this.mongoCartsService.agregatedProduct(idCart, idProduct)
    }

    deleteProduct = (cid, pid) => {
        return this.mongoCartsService.deleteProduct(cid, pid)
    }

    updateCarrito = (cid, productos) => {
        return this.mongoCartsService.updateCarrito(cid, productos)
    }

    actualizarCantidad = (cid, pid, dataCantidad) => {
        return this.mongoCartsService.actualizarCantidad(cid, pid, dataCantidad)
    }

    eliminarProdCarrito = (cid) => {
        return this.mongoCartsService.eliminarProdCarrito(cid)
    }
}

export default MongoCartsService