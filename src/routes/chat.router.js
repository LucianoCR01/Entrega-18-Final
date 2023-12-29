import express from "express";

export const chat = express.Router()

chat.get("/", async (req, res) => {
    const user = req.session.user
    return res.status(200).render("chat", { user })
})