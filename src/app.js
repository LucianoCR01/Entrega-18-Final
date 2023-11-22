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
import session from "express-session";
import MongoStore from "connect-mongo";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import initializePassportGitHub from "./config/passport-Github.config.js";

const app = express()
const PORT = 8080
const mongoUrl = "mongodb+srv://luciano:lucianoCoder@coderbackend.mnsz0hb.mongodb.net/?retryWrites=true&w=majority"
const mongoDB = "My_db_47"

const httpServer = app.listen(PORT, () => {
    console.log(`APP corriendo en el http://localhost:${PORT}`)
})

//Front del socket
connectSocket(httpServer)

//Config para usar JSON en los POST
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));

//handlebars
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"));

//conf Sessiones
app.use(session({
    store: MongoStore.create({
        mongoUrl,
        dbName: mongoDB,
        ttl: 100
    }),
    secret: "secret",
    resave: true.valueOf,
    saveUninitialized: true
}))

///PassPort con Github///
initializePassportGitHub()

///Passport////
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Endpoints
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/handlebars", handlebarsRouter)
app.use("/realtimeproducts", realTime)
app.use("/productsMongo", productsMongo)
app.use("/agregarProductos", agregarProductos)
app.use("/cartsMongo", cartsMongo)
app.use("/chat", chat)
app.use("/", viewsRouter)
app.use("/api/session", sessionRouter)

//Atrapa todas las rutas que no existan
app.get("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        msg: "Ruta no encontrada",
        data: {}
    })
})