import { expect } from "chai"
import supertest from "supertest"

const requester = supertest("http://localhost:8080")

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
            const result = await requester.post("/productsMongo")
                .field("title", productMock.title)
                .field("description", productMock.description)
                .field("code", productMock.code)
                .field("price", productMock.price)
                .field("status", productMock.status)
                .field("stock", productMock.stock)
                .field("category", productMock.category)
                .field("picture", productMock.picture)
            expect(result.status).to.be.eql(201)
            expect(result._body.payload).to.have.property("_id")
            expect(result._body.payload.image).to.be.ok
        })
    })



    describe("Registro, Login & Current", () => {
        it("Debe registrar usuario", async () => {
            const mockUser = {
                first_name: "Sergio",
                lastname: "Murua",
                email: "sergio@hotmail.com",
                password: 123456
            }

            const { _body } = await requester.get("/api/session/singup").send(mockUser)
            expect(_body.payload).to.be.ok
        })

        it("En endpoint GET /login logea ", async () => {
            const dataUser = {
                email: "rafa@gmail.com",
                password: "123456"
            }
            const result = await requester.get("/login")
                .field("email", dataUser.email)
                .field("password", dataUser.password)
            expect(result.status).to.be.eql(200)
            expect(result._body.payload).to.have.property("_id")
            expect(result._body.payload.image).to.be.ok
        })
    })
})