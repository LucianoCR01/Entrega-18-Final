import { Router } from "express";
import passport from "passport";

const viewsRouter = Router()

viewsRouter.get("/", (req, res) => {
    if (req.session?.user) {
        return res.redirect("/profile")
    }
    return res.render("index", {})

})

viewsRouter.get("/login", (req, res) => {
    if (req.session?.user) {
        return res.redirect("/profile")
    }
    res.render("login", {})
})

viewsRouter.get("/singup", (req, res) => {
    if (req.session?.user) {
        return res.redirect("/profile")
    }
    res.render("singup", {})
})

viewsRouter.get("/profile", auth, (req, res) => {
    const user = req.session.user
    res.render("profile", user)
})

viewsRouter.get("/failLogin", (req, res) => {
    res.send({ error: "Failed" })
})

viewsRouter.get("/failRegister", (req, res) => {
    res.send({ error: "Failed" })
})

viewsRouter.get("/login-github", passport.authenticate("github", { scope: ["user:email"] }),
    async (req, res) => { }
)

viewsRouter.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/" }),
    async (req, res) => {
        console.log("callback: ", req.user)
        req.session.user = req.user

        console.log(req.session)
        res.redirect("/")
    }
)

function auth(req, res, next) {
    if (req.session?.user) return next()
    res.redirect("/")
}

export default viewsRouter



//http://localhost:8080/githubcallback
//App ID: 642024
//Client ID: Iv1.7e26381a97036a7a
//35a55cf8d63032da89ad4ea45011537a293299b1