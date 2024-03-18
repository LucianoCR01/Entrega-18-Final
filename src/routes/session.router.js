import { Router } from "express";
//import UserModel from "../dao/models/user.model.js"
//import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";
import { changeRol, deleteUsers, fetchDeleteUser, getUser, loginUser, searchUser } from "../controllers/userRol.controller.js";
import UserModel from "../dao/mongo/models/user.model.js";
import { uploadFile } from "../utils.js";
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

sessionRouter.post("/login", passport.authenticate("login", { failureRedirect: "/failRegister" }), loginUser)

sessionRouter.get("/logout", async (req, res) => {
    const date = new Date()
    const updateTime = await UserModel.findOneAndUpdate({ email: req.session.user.email }, { last_connection: date })
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

sessionRouter.get("/premium/:email", changeRol)
sessionRouter.get("/", getUser)
sessionRouter.delete("/", deleteUsers)
sessionRouter.post("/:uid/documents", uploadFile(), sendDocuments)
sessionRouter.get("/admin/:email", auth, searchUser)
sessionRouter.get("/delete/:email", fetchDeleteUser)

function auth(req, res, next) {
    const user = req.session.user ?? false
    if (user.isAdmin == true) return next()
    res.redirect("/")
}

export default sessionRouter