import express from "express";
import { cartsRouter } from "./routes/carts.router.js"
import { __dirname } from "./utils.js";
import path from "path"
import { productsRouter } from "./routes/products.routes.js";
import { handlebarsRouter } from "./routes/handlebars.router.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import { realTime } from "./routes/realTime.router.js";
import { productos } from "./clases/clases.product.js";

const app = express()
const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log(`APP corriendo en el http://localhost:${PORT}`)
})

const socketServer = new Server(httpServer)

//FRONT del socket
//agregar Productos
socketServer.on("connection", socket => {
    console.log("Se abrio un Socket " + socket.id)
    socket.on("newProduct", async newProduct => {
        productos.addProduct(newProduct)
        const listProdSocke = await productos.getProducts()
        socket.emit("listProdSocke", listProdSocke)
    })

    socket.on("inputEliminar", async inputEliminar => {
        const delProdSocke = await productos.deleteProduct(inputEliminar)
        socket.emit("delProdSocke", delProdSocke)
    })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));

//handlebars
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"));

//Endpoints
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/handlebars", handlebarsRouter)
app.use("/realtimeproducts", realTime)

//Atrapa todas las rutas que no existan
app.get("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        msg: "Ruta no encontrada",
        data: {}
    })
})