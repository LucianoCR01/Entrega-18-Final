import MongoCartsService from "../services/carts.services.js";

const mongoCartsService = new MongoCartsService()

export const createCart = async (req, res) => {
    try {
        return res.status(200).json({
            status: "success",
            msg: "Carrito Agregado",
            data: await mongoCartsService.createCart()
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
        res.cookie("cartId", idCart)
        return res.status(200).json({
            status: "success",
            msg: "Carrito Buscado",
            data: await mongoCartsService.findCart(idCart)
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

export const agregatedProduct = async (req, res) => {

    const idCart = req.params.cid
    const idProduct = req.params.pid
    const userInfo = req.session.user
    try {
        return res.status(200).json({
            status: "success",
            msg: "Producto Agregado",
            data: await mongoCartsService.agregatedProduct(idCart, idProduct, userInfo)
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
            data: await mongoCartsService.deleteProduct(cid, pid)
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
            data: await mongoCartsService.updateCarrito(cid, productos)
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
            data: await mongoCartsService.actualizarCantidad(cid, pid, dataCantidad)
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
            data: await mongoCartsService.eliminarProdCarrito(cid)
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