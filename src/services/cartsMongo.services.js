import CartsModelsMongo from "../dao/mongo/mongoCarts.models.js";

class CartsMongoServices {
    constructor() {
        this.cartsMongoServices = new CartsModelsMongo()
    }

    createCart = () => {
        return this.cartsMongoServices.createCart()
    }

    findCart = async (idCart) => {
        const prodCarts = await this.cartsMongoServices.findCart(idCart)
        const filteredData = prodCarts.productos.map(obj => {
            return {
                title: obj.product.title,
                price: obj.product.price,
                quantity: obj.quantity
            };
        })
        return filteredData
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

    purchase = (cid, userMail) => {
        return this.cartsMongoServices.purchase(cid, userMail)
    }

    finishBuy = async (idCart) => {
        const prodCarts = await this.cartsMongoServices.findCart(idCart)
        const filteredData = prodCarts.productos.map(obj => {
            return {
                price: obj.product.price,
                quantity: obj.quantity
            };
        })
        let c = 0
        filteredData.forEach(element => {
            c += element.price * element.quantity
        });
        return c
    }
}

export default CartsMongoServices