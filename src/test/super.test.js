import chai from "chai"
import supertest from "supertest"

const expect = chai.expect
const requester = supertest("http://127.0.0.1:8080")

describe("testing ecommers", () => {
    describe("test product", () => {
        it("En endpoint POST /productsMongo debera crear un producto", async () => {
            const productMock = {
                title: "zapallito",
                description: "verde",
                code: 78945613,
                price: 123456,
                status: true,
                stock: 123456,
                category: "verdura",
                picture: "http://localhost:8080/frutas-y-verduras.jpg"
            }
            const reponse = (await requester.post("/productsMongo")).setEncoding(productMock)
            const { status, ok, _body } = reponse

            console.log(status, ok, _body)
            expect(true).to.be(true)
        })
    })
})