import express from "express";
import { cartsRouter } from "./routes/carts.router.js"
import { __dirname } from "./utils.js";
import path from "path"
import { productsRouter } from "./routes/products.routes.js";

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

app.listen(PORT, () => console.log(`Servicdor escuchando http://localhost:${PORT}/`));

//Atrapa todas las rutas que no existan
app.get("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        msg: "Ruta no encontrada",
        data: {}
    })
})