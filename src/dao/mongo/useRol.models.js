import nodemailer from "nodemailer"
import UserModel from "./models/user.model.js"
import dotenv from "dotenv"

dotenv.config()

const authUser = process.env.authUser
const authPass = process.env.authPass

class UserRolModels {
    async changeRol(email) {
        const findUser = await UserModel.findOne({ email: email })
        if (findUser.isAdmin) {
            return findUser
        }
        if (findUser.isUser) {
            if (findUser.identificacion && findUser.domicilio && findUser.cuenta) {
                findUser.isUser = false
                findUser.premium = true
                await findUser.save()
                return findUser
            } else {
                return { error: "Debe terminar de subir su documentacion" }
            }
        }
        if (findUser.premium) {
            findUser.premium = false
            findUser.isUser = true
            await findUser.save()
            return findUser
        }
    }

    async userGet() {
        const users = await UserModel.find()
        return users
    }

    async deleteUsers() {
        // Obtener la fecha límite (hace 2 días)
        const limiteFecha = new Date();
        limiteFecha.setDate(limiteFecha.getDate() - 2);
        // Consulta para obtener los usuarios que serán eliminados
        const usuariosAEliminar = await UserModel.find({ last_connection: { $lt: limiteFecha } })
        const transport = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: authUser,
                pass: authPass
            }
        })

        usuariosAEliminar.forEach(element => {
            let email = element.email
            const result = {
                from: "lucianoloki@gmail.com",
                to: email,
                subject: "Borrado de la base de datos",
                html: `<div><h1>Te borramos la cuenta Maquina<h1/></div>`,
            }
            transport.sendMail(result)
        });

        // Eliminar los usuarios que no se han conectado en los últimos 2 días
        const result = await UserModel.deleteMany({ last_connection: { $lt: limiteFecha } })
        return usuariosAEliminar
    }

    async searchUser(email) {
        const result = await UserModel.findOne({ email: email })
        return result
    }

    async fetchDeleteUser(email) {
        const deleteUsu = await UserModel.findOneAndDelete({ email: email })
        return deleteUsu
    }
}
export default UserRolModels