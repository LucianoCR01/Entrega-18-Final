import express from "express";
import { getMoking } from "../controllers/mokingProducts.controllers.js";

export const mokingProducts = express.Router()

mokingProducts.get("/", getMoking)