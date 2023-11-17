
////////////////////////Multer ////////////////////////
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/public");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

export const uploader = multer({ storage });

///////////////////Dirname y Filename///////////////////////////////
// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
/////////////////socket IO////////////////////
import { Server } from "socket.io";
import productModel from "./dao/models/products.model.js";

const messages = []

export function connectSocket(httpServer) {
    const socketServer = new Server(httpServer)
    socketServer.on("connection", socket => {
        console.log("Se abrio un Socket " + socket.id)
        socket.on("newProduct", async newProduct => {
            newProduct["status"] = true
            const result = await productModel.create(newProduct)
            socket.emit("listProdSocke", result)
        })

        socket.on("inputEliminar", async inputEliminar => {
            const delProdSocke = await productModel.deleteOne({ _id: inputEliminar })
            socket.emit("delProdSocke", delProdSocke)
        })

        ////Chat////
        socket.on("message", (data) => {
            messages.push(data)
            socketServer.emit("messageLogs", messages)
        })
    })
}
///////////////////////Mongoose//////////////////
import mongoose from "mongoose";
const url = "mongodb+srv://luciano:lucianoCoder@coderbackend.mnsz0hb.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(url, { dbName: "CoderHouse" })
    .then(() => {
        console.log("DB connected")
    })
    .catch(e => {
        console.error("Error conectando a la DB")
    })

////////////////////Bcrypt//////////////////
import bcrypt from "bcrypt"

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)