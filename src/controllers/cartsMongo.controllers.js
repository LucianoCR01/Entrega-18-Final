import CartsMongoServices from "../services/cartsMongo.services.js";

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
        return res.status(200).json({
            status: "success",
            msg: "Carrito Buscado",
            data: await cartsMongoServices.findCart(idCart)
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