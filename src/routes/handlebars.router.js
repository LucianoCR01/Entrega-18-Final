import Express from "express";
import { getProductsHandlebars } from "../controllers/handlebars.controllers.js";

export const handlebarsRouter = Express.Router()

handlebarsRouter.get("/", getProductsHandlebars)