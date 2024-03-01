import CartsMongoServices from "../services/cartsMongo.services.js";
// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: 'TEST-2185294003022118-022916-fa1c23c1ca3bbc7d3527b2c333343ed7-306272737' });

const cartsMongoServices = new CartsMongoServices()

export const createCart = async (req, res) => {
    try {
        return res.status(200).json({
            status: "success",
            msg: "Carrito Agregado",
            data: await cartsMongoServices.createCart()
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
}

export const findCart = async (req, res) => {
    try {
        const idCart = req.params.cid
        const dataCart = await cartsMongoServices.findCart(idCart)
        return res.status(200).render("cart", { dataCart })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
}

export const agregatedProduct = async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    try {
        return res.status(200).json({
            status: "success",
            msg: "Producto Agregado",
            data: await cartsMongoServices.agregatedProduct(idCart, idProduct)
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
}

export const deleteProduct = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        return res.status(200).json({
            status: "success",
            msg: "Producto Eliminado",
            data: await cartsMongoServices.deleteProduct(cid, pid)
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        })
    }
}

export const updateCarrito = async (req, res) => {
    const { cid } = req.params
    const productos = req.body
    try {
        return res.status(200).json({
            status: "success",
            msg: "Carrito Actualizado",
            data: await cartsMongoServices.updateCarrito(cid, productos)
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        })
    }
}

export const actualizarCantidad = async (req, res) => {
    const dataCantidad = req.body.data
    const { cid } = req.params
    const { pid } = req.params
    try {
        return res.status(200).json({
            status: "success",
            msg: "Cantidad Actualizada",
            data: await cartsMongoServices.actualizarCantidad(cid, pid, dataCantidad)
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        })
    }
}

export const eliminarProdCarrito = async (req, res) => {
    const { cid } = req.params
    try {
        return res.status(200).json({
            status: "success",
            msg: "Productos Borrados",
            data: await cartsMongoServices.eliminarProdCarrito(cid)
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        })
    }
}

export const purchase = async (req, res) => {
    const { cid } = req.params
    const userMail = req.session.user.email
    try {
        return res.status(200).json({
            status: "success",
            msg: "Compra realizada",
            data: await cartsMongoServices.purchase(cid, userMail)
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        })
    }
}

export const finishBuy = async (req, res) => {
    try {
        const idCart = req.params.cid
        const totalPrice = await cartsMongoServices.finishBuy(idCart)
        return res.status(200).render("finishBuy", { totalPrice })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
}

export const finishMercadoPago = async (req, res) => {
    try {
        const body = {
            items: [
                {
                    quantity: 1,
                    unit_price: Number(req.body.price),
                    currency_id: "ARS",
                },
            ],
            ///////En la doc de MercadoPago no se puede usar el entorno local para las back urls/////////
            back_urls: {
                success: "https://es.textstudio.com/logo/182/Successful",
                failure: "https://www.istockphoto.com/es/vector/dejar-el-sello-de-tinta-gm951985126-259883383",
                pending: "https://stock.adobe.com/es/search?k=pending"
            },
            auto_return: "approved",
        }
        const preference = new Preference(client)
        const result = await preference.create({ body })
        res.json({
            id: result.id,
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            error: "error al crear preferencia"
        })
    }
}