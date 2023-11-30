import express from "express";
import {login} from "../controller/login";

export const routerLogin = express.Router();

routerLogin.post("/login", login);