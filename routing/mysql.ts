import express from "express";
import {crear, update, selectAll, selectById, deleteById} from "../controller/mysql";

export const routerMysql = express.Router();

routerMysql.post("/crear", crear);
routerMysql.put("/update", update);
routerMysql.get("/", selectAll);
routerMysql.get("/getById", selectById);
routerMysql.delete("/delete", deleteById);