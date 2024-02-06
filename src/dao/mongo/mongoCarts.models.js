import { CartsModel } from "./models/carts.model.js";
import productModel from "./models/products.model.js";
import ticketModel from "./models/ticket.model.js";
import crypto from "crypto"

class CartsModelsMongo {
    async getProducts(cid) {
        const doc = await CartsModel.findById(cid).populate('products.product');
        if (!doc) {
            throw new Error('Cart not found');
        }
        return doc;
    }

    async createCart(productos) {
        const cartCreated = await CartsModel.create({ productos })
        return cartCreated
    }

    async findCart(idParam) {
        const findCart = await CartsModel.findOne({ _id: idParam }).populate('productos.product')
        return findCart
    }

    async agregatedProduct(idCart, idProduct, userInfo) {
        const doc = await CartsModel.findById({ _id: idCart })
        const product = await productModel.findById({ _id: idProduct })

        const isPremiumUser = userInfo && userInfo.premium;
        if (isPremiumUser) {
            if (product.owner == userInfo.mail) {
                throw new Error("Este producto te pertenece, no lo puedes agregar")
            }

            try {
                if (!doc) {
                    throw new Error('Carrito no encontrado');
                }
                if (!product) {
                    throw new Error('Producto no encontrado');
                }
                doc.productos.push({ product: product._id, quantity: 1 })
                await doc.save()
                return doc
            } catch (error) {
                throw error;
            }

        }

        try {
            if (!doc) {
                throw new Error('Carrito no encontrado');
            }
            if (!product) {
                throw new Error('Producto no encontrado');
            }
            doc.productos.push({ product: product._id, quantity: 1 })
            await doc.save()
            return doc
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(cid, pid) {
        const doc = await CartsModel.findById(cid)
        const productIndex = doc.productos.findIndex((p) => p.product._id.toString() == pid)
        if (productIndex === -1) {
            throw new Error("Producto no encontrado")
        }
        doc.productos.splice(productIndex, 1)
        await doc.save()
        return doc
    }

    async updateCarrito(cid, productos) {
        const doc = await CartsModel.findByIdAndUpdate(cid, { productos }, { new: true })
        return doc
    }

    async actualizarCantidad(cid, pid, dataCantidad) {
        const doc = await CartsModel.findById(cid)
        const productIndex = doc.productos.findIndex((p) => p.product._id.toString() == pid)
        if (productIndex == -1) {
            throw new Error("Producto no encontrado")
        }
        doc.productos[productIndex].quantity = dataCantidad
        await doc.save()
        return doc
    }

    async eliminarProdCarrito(cid) {
        let doc = await CartsModel.findOne({ _id: cid })
        doc.productos = []
        await doc.save()
    }

    async purchase(cid, userMail, diaSemana, mes) {
        const findCart = await CartsModel.findOne({ _id: cid })
        const prodCart = findCart.productos

        let amount = 0
        const prodSinStock = []
        prodCart.forEach(async element => {
            let checkStock = element.product.stock - element.quantity
            if (checkStock < 0) {
                let _id = element.product._id
                let idLimpio = _id._id.toString().replace(/ObjectId\("(.*)"\)/, "$1")
                prodSinStock.push(idLimpio)
            } else {
                amount = amount + element.quantity * element.product.price
                const idProd = element.product._id
                const product = await productModel.findOne({ _id: idProd })
                product.stock = product.stock - element.quantity
                this.deleteProduct(cid, idProd)
                await product.save()
            }
        });
        let fecha = new Date()
        let code = crypto.randomUUID()
        let purchase_datetime = `${diaSemana[fecha.getDay()]}, ${fecha.getDate()} de ${mes[fecha.getMonth()]} de ${fecha.getFullYear()} a las ${fecha.toLocaleTimeString()}`
        let data = { code, purchase_datetime, amount, userMail }
        const ticket = await ticketModel.create(data)
        const dataCliente = `Su ticket de compra es ${JSON.stringify(data)} y los productos sin Stock son ${prodSinStock}`

        return dataCliente
    }
}

export default CartsModelsMongo