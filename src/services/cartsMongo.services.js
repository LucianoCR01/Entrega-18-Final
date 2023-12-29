import CartsModelsMongo from "../dao/mongo/mongoCarts.models.js";

class CartsMongoServices {
    constructor() {
        this.cartsMongoServices = new CartsModelsMongo()
    }

    createCart = () => {
        return this.cartsMongoServices.createCart()
    }

    findCart = (idCart) => {
        return this.cartsMongoServices.findCart(idCart)
    }

    agregatedProduct = (idCart, idProduct) => {
        return this.cartsMongoServices.agregatedProduct(idCart, idProduct)
    }

    deleteProduct = (cid, pid) => {
        return this.cartsMongoServices.deleteProduct(cid, pid)
    }

    updateCarrito = (cid, productos) => {
        return this.cartsMongoServices.updateCarrito(cid, productos)
    }

    actualizarCantidad = (cid, pid, dataCantidad) => {
        return this.cartsMongoServices.actualizarCantidad(cid, pid, dataCantidad)
    }

    eliminarProdCarrito = (cid) => {
        return this.cartsMongoServices.eliminarProdCarrito(cid)
    }

    purchase = (cid, purchaser) => {
        let diaSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
        let mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]


        return this.cartsMongoServices.purchase(cid, purchaser, diaSemana, mes)
    }
}

export default CartsMongoServices