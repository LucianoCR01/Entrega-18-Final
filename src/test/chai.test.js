import mongoose from "mongoose";
import { expect } from "chai";
import ProductsService from "../dao/mongo/productsMongo.models.js";
import { generateProducts } from "../utils.js";

const url = "mongodb+srv://luciano:lucianoCoder@coderbackend.mnsz0hb.mongodb.net/?retryWrites=true&w=majority"
before(async () => {
    await mongoose.connect(url, { dbName: "CoderHouse" })
        .then(() => {
            console.log("DB connected")
        })
        .catch(e => {
            console.error("Error conectando a la DB")
        })
});

after(async () => {
    await mongoose.disconnect();
});

//// Expect Chai es mas utilizado en la industria 

describe("Testing Product Dao", () => {

    it("El dao debe poder obtener los un producto en espeficico", async () => {
        let idp = "65380eb768ecdd96a0bd6354"
        const productDao = new ProductsService()
        const result = await productDao.findProducts(idp)
        expect(typeof (result)).to.be.deep.equal("object")
    })

    it("El dao debe poder crear un producto", async () => {
        let product = generateProducts()
        const productDao = new ProductsService()
        const result = await productDao.createProduct(product.title, product.description, product.code, product.price, product.status, product.stock, product.category, product.picture)
        expect(typeof (result)).to.be.deep.equal("object")
    })

    it("El dao Actualiza el producto", async () => {
        let product = generateProducts()
        const pid = "65c263dbc7f082429766b8ae"
        const productDao = new ProductsService()
        const result = await productDao.updateProduct(pid, product.title, product.description, product.code, product.price, product.status, product.stock, product.category, product.picture)
        expect(typeof (result)).to.be.deep.equal("object")
    })
})
