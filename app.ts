import express, { Request, Response, NextFunction } from "express";
import {routerMysql} from "./routing/mysql";

const app = express();
app.use(express.json());
const PORT = 3000;

app.use("/api/mysql", routerMysql);

app.get("/", (req: Request, res: Response) => {
    res.send("<p style='text-align:center;font-size:30px'>Conexión establecida</p>");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: ${PORT}`);
});

