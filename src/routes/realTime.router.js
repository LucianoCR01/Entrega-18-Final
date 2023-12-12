import express from "express";
import { getProductsRealTime } from "../controllers/realTime.controllers.js";

export const realTime = express.Router()

realTime.get("/", getProductsRealTime)