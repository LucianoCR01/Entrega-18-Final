import ProductMongoService from "../services/productsMongo.service.js";

const ProductMongo = new ProductMongoService()

export const getProductsMongo = async (req, res) => {
    try {
        const page = req.query.page ?? 1
        const limit = req.query.limit ?? 10
        const filtro = req.query.filtro
        const sort = req.query.sort ?? 1

        const options = {
            limit: limit,
            page: page,
            sort: { price: sort }
        }

        const user = req.session.user
        const products = await ProductMongo.getProducts(options, filtro)
        res.status(200).render("mongoDbProducts", { products, user });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
}

export const findProducts = async (req, res) => {
    const idParam = req.params.pid
    try {
        const findProducts = await ProductMongo.findProducts(idParam)
        return res.status(200).json({
            status: "success",
            msg: "listado de Productos",
            data: findProducts,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, picture } = req.body;
        const productCreated = await ProductMongo.createProduct(title, description, code, price, status, stock, category, picture);
        return res.status(201).json({
            status: "success",
            msg: "product created",
            data: productCreated,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, code, price, status, stock, category, picture } = req.body;
    try {
        const productUptaded = await ProductMongo.updateProduct(id, title, description, code, price, status, stock, category, picture)
        return res.status(201).json({
            status: "success",
            msg: "product updated",
            data: productUptaded,
        });
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
    try {
        const { id } = req.params;
        const deleted = await ProductMongo.deleteProduct(id);
        return res.status(200).json({
            status: "success",
            msg: "product deleted",
            data: {},
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
}

