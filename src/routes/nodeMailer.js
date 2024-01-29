import Express from "express"
import nodemailer from "nodemailer"
import UserModel from "../dao/mongo/models/user.model.js";
import { createHash, generateRandomString, isValidPassword } from "../utils.js";
import UserPasswordModel from "../dao/mongo/models/userPassword.model.js";

export const nodeMailer = Express.Router()

nodeMailer.get("/", (req, res) => {
    res.status(200).render("forgetPassword", {});
})

nodeMailer.post("/", async (req, res) => {
    const email = req.body.email
    const user = await UserModel.findOne({ email })
    if (!user) {
        return res.status(404).json({ status: "error", error: "User not Found" })
    }
    const token = generateRandomString(16)
    await UserPasswordModel.create({ email, token })
    const transport = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
            user: "lucianoloki@gmail.com",
            pass: "gcbhgzxhtyfxcqhn"
        }
    })
    const result = {
        from: "lucianoloki@gmail.com",
        to: email,
        subject: "[Coder House] Reset your password",
        html: `<div><h1>Reset your password. Click in URL http://localhost:8080/forget-password/verify-token/${token}<h1/></div>`,
    }
    try {
        await transport.sendMail(result)
        res.json({ status: "success", message: `Email successfully send to ${email}` })
    } catch (err) {
        res.status(500).json({ status: "error", error: err.message })
    }
})

nodeMailer.get("/verify-token/:token", async (req, res) => {
    const userPassword = await UserPasswordModel.findOne({ token: req.params.token })
    if (!userPassword) {
        return res.redirect("/forget-password")
    }
    const user = userPassword.email
    res.render("resetPassword", { user })
})

nodeMailer.post("/:user", async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.params.user })
        const verificar = isValidPassword(user, req.body.newPassword)
        if (verificar) {
            res.json({ status: "error", error: "La contraseña es la misma, elegir otra" })
        } else {
            await UserModel.findByIdAndUpdate(user._id, { password: createHash(req.body.newPassword) })
            res.json({ status: "success", message: "Se ha creado una nueva contraseña" })
            await UserPasswordModel.deleteOne({ email: req.params.user })
        }
    } catch (err) {
        res.json({ status: "error", error: err.message })
    }
})