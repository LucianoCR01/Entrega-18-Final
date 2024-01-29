import express from "express";
import { changeRol } from "../controllers/userRol.controller.js";

export const userRol = express.Router()

userRol.get("/:uid", changeRol)