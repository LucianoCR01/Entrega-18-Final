import { Router } from "express";

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
        return res.redirect("/prfile")
    }
    res.render("singup", {})
})

viewsRouter.get("/profile", auth, (req, res) => {
    const user = req.session.user
    res.render("profile", user)
})

function auth(req, res, next) {
    if (req.session?.user) return next()
    res.redirect("/")
}

export default viewsRouter