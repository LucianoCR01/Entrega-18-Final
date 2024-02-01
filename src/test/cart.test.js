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

const assert = Assert.strict

describe("Testing Cart Dao", () => {
    it("El dao debe poder obtener los carritos", async () => {
        let cart = "65454515685ca97b29f02475"
        const cartDao = new CartsModelsMongo()
        const result = await cartDao.findCart(cart)
        assert.strictEqual(typeof result === "object", true)
    })
})

after(async () => {
    await mongoose.disconnect();
});