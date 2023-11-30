import express from "express";
import {login, profile} from "../controller/login";

export const routerLogin = express.Router();

routerLogin.post("/login", login);
routerLogin.get("/profile", profile);