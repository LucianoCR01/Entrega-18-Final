import express from "express";

export const chat = express.Router()

chat.get("/", async (req, res) => {
    return res.status(200).render("chat", {})
})