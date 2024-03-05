import CartsModelsMongo from "../dao/mongo/mongoCarts.models.js";
import nodemailer from "nodemailer"

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

    purchase = async (cid, userMail) => {
        const data = await this.cartsMongoServices.purchase(cid, userMail)
        const transport = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: "lucianoloki@gmail.com",
                pass: "gcbhgzxhtyfxcqhn"
            }
        })
        const result = {
            from: "lucianoloki@gmail.com",
            to: userMail,
            subject: "Ticket Compra",
            html: `<div><h1>${data}<h1/></div>`,
        }
        transport.sendMail(result)
        return data
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