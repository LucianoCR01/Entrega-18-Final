import express from "express"
import { loggerTestController } from "../controllers/loggerTest.js"

export const loggerTest = express.Router()

loggerTest.get("/", loggerTestController)