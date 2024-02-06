import mongoose from "mongoose";
import Assert from "assert";
import CartsModelsMongo from "../dao/mongo/mongoCarts.models.js";

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

const assert = Assert.strict

describe("Testing Cart Dao", () => {
    it("Agregar producto al carrito", async () => {
        let idCart = "654ba0ad657a546c458f6fc3"
        let idProduct = "65380eb768ecdd96a0bd6354"
        const cartDao = new CartsModelsMongo()
        const result = await cartDao.agregatedProduct(idCart, idProduct)
        console.log(result)
        assert.strictEqual(typeof (result), "object")
    })

    it("Crear carrito", async () => {
        const cartDao = new CartsModelsMongo()
        const result = await cartDao.createCart()
        assert.strictEqual(typeof (result), "object")
    })

    it("Actualiza la cantidad de un producto", async () => {
        let cid = "654ba0ad657a546c458f6fc3"
        let pid = "65380eb768ecdd96a0bd6354"
        let dataCantidad = 20
        const cartDao = new CartsModelsMongo()
        const result = await cartDao.actualizarCantidad(cid, pid, dataCantidad)
        assert.strictEqual(typeof (result), "object")
    })

    it("El dao debe poder obtener un carrito en especifico", async () => {
        let cart = "654ba0ad657a546c458f6fc3"
        const cartDao = new CartsModelsMongo()
        const result = await cartDao.findCart(cart)
        assert.strictEqual(typeof (result), "object")
    })
})