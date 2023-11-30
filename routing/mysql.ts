import express from "express";
import {crear, update, selectAll, selectById, deleteById, hacerOperacion} from "../controller/mysql";

export const routerMysql = express.Router();

routerMysql.post("/crear", crear);
routerMysql.post("/hacerOperacion", hacerOperacion);
routerMysql.put("/update", update);
routerMysql.get("/", selectAll);
routerMysql.get("/getById", selectById);
routerMysql.delete("/delete", deleteById);