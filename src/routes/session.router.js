import { Router } from "express";
//import UserModel from "../dao/models/user.model.js"
//import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";
import { changeRol } from "../controllers/userRol.controller.js";
import UserModel from "../dao/mongo/models/user.model.js";
import { dateTime } from "../utils.js";
import { sendDocuments } from "../controllers/documents.controllers.js";

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

sessionRouter.post("/login", passport.authenticate("login", { failureRedirect: "/failRegister" }), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: "error", error: "Invalid credentials" })
    }

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        isUser: req.user.isUser,
        isAdmin: req.user.isAdmin,
        premium: req.user.premium
    }

    const updateTime = await UserModel.findOneAndUpdate({ email: req.session.user.email }, { last_connection: dateTime() })
    res.redirect("/productsMongo")
})

sessionRouter.get("/logout", async (req, res) => {
    const updateTime = await UserModel.findOneAndUpdate({ email: req.session.user.email }, { last_connection: dateTime() })
    req.session.destroy(err => {
        if (err) return res.send("Logout error")

        res.redirect("/")
    })
})

// sessionRouter.get("/login-github", passport.authenticate("github", { scope: ["user:email"] }),
//     async (req, res) => { }
// )

// sessionRouter.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/" }),
//     async (req, res) => {
//         console.log("callback: ", req.user)
//         req.session.user = req.user

//         console.log(req.session)
//         res.redirect("/")
//     }
// )

sessionRouter.get("/premium/:uid", changeRol)
sessionRouter.post("/:uid/documents", sendDocuments)

export default sessionRouter