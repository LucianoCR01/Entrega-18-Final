import { Router } from "express";
import UserModel from "../dao/models/user.model.js"
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const sessionRouter = Router()

// sessionRouter.post("/singup", async (req, res) => {
//     const user = req.body
//     // const user = {
//     //     first_name: req.body.first_name,
//     //     last_name: req.body.last_name,
//     //     age: req.body.age,
//     //     email: req.body.email,
//     //     password: createHash(req.body.password)
//     // }
//     user.password = createHash(req.body.password)
//     await UserModel.create(user)
//     res.redirect("/login")
// })

sessionRouter.post("/singup", passport.authenticate("register", { failureRedirect: "/failRegister" }), async (req, res) => {
    res.redirect("/login")
})




// sessionRouter.post("/login", async (req, res) => {
//     const { email, password } = req.body
//     const user = await UserModel.findOne({ email })
//     if (!user) {
//         return res.status(401).render("errors/base", {
//             error: "Usuario no encontrado"
//         })
//     }
//     if (!isValidPassword(user, password)) {
//         return res.status(403).send({ status: "error", error: "Incorrect password" })
//     }
//     req.session.user = user
//     res.redirect("/profile")
// })

sessionRouter.post("/login", passport.authenticate("login", { failureRedirect: "/failLogin" }), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: "error", error: "Invalid credentials" })
    }
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age
    }

    res.redirect("/productsMongo")
})

sessionRouter.get("/logout", async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send("Logout error")

        res.redirect("/")
    })
})

export default sessionRouter