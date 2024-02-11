
////////////////////////Multer ////////////////////////
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/public/products");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

export const uploader = multer({ storage });

////////////////////Multer Para /api/session/uid/documents//////////
const storageDocuments = multer.diskStorage({
    destination: function (req, file, cb) {
        // Seleccionar la carpeta de destino según el tipo de archivo
        if (file.fieldname === 'image') {
            cb(null, 'uploads/images/');
        } else if (file.fieldname === 'document') {
            cb(null, 'uploads/documents/');
        } else {
            cb(new Error('Tipo de archivo no válido'));
        }
    },
    filename: function (req, file, cb) {
        // Definir el nombre del archivo (puedes personalizar según tus necesidades)
        cb(null, file.originalname);
    }
})

///////////////////Dirname y Filename///////////////////////////////
// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
/////////////////socket IO////////////////////
import AgregarProdService from "./services/agregarProductos.services.js";
import { Server } from "socket.io";
import productModel from "./dao/mongo/models/products.model.js";
import UserModel from "./dao/mongo/models/user.model.js";

const messages = []

const agregarProdService = new AgregarProdService()

export function connectSocket(httpServer) {
    const socketServer = new Server(httpServer)
    socketServer.on("connection", socket => {
        console.log("Se abrio un Socket " + socket.id)
        socket.on("newProduct", async newProduct => {
            newProduct["status"] = true
            const result = await agregarProdService.createProdARG(newProduct)
            socket.emit("listProdSocke", result)
        })

        socket.on("inputEliminar", async prodEliminar => {
            const findProd = await productModel.findById({ _id: prodEliminar.id_Eliminar })
            const findUser = await UserModel.findOne({ email: prodEliminar.userMail })
            if (findUser.isAdmin || findProd.owner == findUser.email) {
                const delProdSocke = await productModel.deleteOne({ _id: prodEliminar.id_Eliminar })
                socket.emit("delProdSocke", delProdSocke)
            } else {
                console.log("No puedes eliminar un producto que no es tuyo")
            }
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

////////////////////Moking//////////////////
import { faker } from "@faker-js/faker";

export const generateProducts = () => {

    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.number.int(),
        status: faker.datatype.boolean(),
        code: faker.number.int(),
        stock: faker.number.int(),
        category: faker.commerce.productMaterial(),
        picture: faker.image.urlPicsumPhotos()
    }
}

//////////////// Genera una cadena de caracteres aleatoria/////////////////////////
export const generateRandomString = (num) => {
    return [...Array(num)].map(() => {
        const randomNum = ~~(Math.random() * 36)
        return randomNum.toString(36)
    })
        .join("")
        .toUpperCase()
}


/////////////////////////////////Fecha y hora////////////////////////////

export const dateTime = () => {
    let fecha = new Date()
    let diaSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    let mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    let purchase_datetime = `${diaSemana[fecha.getDay()]}, ${fecha.getDate()} de ${mes[fecha.getMonth()]} de ${fecha.getFullYear()} a las ${fecha.toLocaleTimeString()}`
    return purchase_datetime
}