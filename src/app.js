import express from "express";
import { __dirname, connectSocket } from "./utils.js";
import path from "path"
import handlebars from "express-handlebars"
import { cartsRouter } from "./routes/carts.router.js"
import { productsRouter } from "./routes/products.routes.js";
import { handlebarsRouter } from "./routes/handlebars.router.js";
import { realTime } from "./routes/realTime.router.js";
import { productsMongo } from "./routes/productsMongo.routers.js"
import { chat } from "./routes/chat.router.js";
import { cartsMongo } from "./routes/cartsMongo.routers.js";
import { agregarProductos } from "./routes/agregarProductos.router.js";

const app = express()
const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log(`APP corriendo en el http://localhost:${PORT}`)
})

//Front del socket
connectSocket(httpServer)

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
app.use("/productsMongo", productsMongo)
app.use("/agregarProductos", agregarProductos)
app.use("/cartsMongo", cartsMongo)
app.use("/chat", chat)

//Atrapa todas las rutas que no existan
app.get("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        msg: "Ruta no encontrada",
        data: {}
    })
})