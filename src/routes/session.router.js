import { Router } from "express";
import UserModel from "../dao/models/user.model.js"

const sessionRouter = Router()

sessionRouter.post("/singup", async (req, res) => {
    const user = req.body
    await UserModel.create(user)
    res.redirect("/login")
})

sessionRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email, password })
    if (!user) return res.redirect("/login")

    req.session.user = user

    res.redirect("/profile")
})

sessionRouter.get("/logout", async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send("Logout error")

        res.redirect("/")
    })
})

export default sessionRouter