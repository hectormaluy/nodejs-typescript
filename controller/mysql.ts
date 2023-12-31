import { Request, Response, NextFunction } from "express";
import {encriptar} from "../utils/bcrypt";
import {Mysql} from "../service/mysql";
import UpdateSchema from "../schemas/Update";
import CrearSchema from "../schemas/Crear";
import OperacionSchema from "../schemas/Operacion";
import DeleteSchema from "../schemas/Delete";

const mysql = new Mysql();

export async function crear(req: Request, res: Response) {
    try {
        const body = req.body;

        const {error, value} = CrearSchema.validate({...body});
        if (error) {
            throw new Error(error.message);
        }

        let passwordHashed: any = await encriptar(body.password);
    
        mysql.setNombre(body.nombre);
        mysql.setEmail(body.email);
        mysql.setPassword(passwordHashed);
        mysql.setRol(body.rol);

        const sql = `INSERT INTO users (nombre, email, password, rol) VALUES ("${mysql.getNombre()}","${mysql.getEmail()}","${mysql.getPassword()}","${mysql.getRol()}")`;
        let connection = mysql.createConnection();
        let result = await mysql.insert(sql, connection);
        res.status(201).json({status: 201, message: "Registro creado", result: result});

    } catch(error: any) {
        res.status(400).json({status: 400, message: error.message,});
    }
    
}

export async function update(req: Request, res: Response) {
    try {
        const body = req.body;

        const {error, value} = UpdateSchema.validate({...body});
        if (error) {
            throw new Error(error.message);
        }

        mysql.setId(body.id);
        mysql.setNombre(body.nombre);
        mysql.setEmail(body.email);
    

        const sql = `UPDATE users SET nombre="${mysql.getNombre()}",email="${mysql.getEmail()}" WHERE id="${mysql.getId()}"`;
        let connection = mysql.createConnection();
        let result = await mysql.update(sql, connection);
        res.status(200).json({status: 200, message: "Registro actualizado", result: result});

    } catch(error: any) {
        res.status(400).json({status: 400, message: error.message,});
    }
    
}

export async function selectAll(req: Request, res: Response) {
    try {
    const sql = `SELECT * FROM users`;
        let connection = mysql.createConnection();
        let result = await mysql.select(sql, connection);
        res.status(200).json({status: 200, message: "Registros obtenidos", result: result});

    } catch(error: any) {
        res.status(400).json({status: 400, message: error.message,});
    }
    
}

export async function selectById(req: Request, res: Response) {
    try {
        const id = (Number(req.query.id));
        mysql.setId(id);

        const sql = `SELECT * FROM users WHERE id=${mysql.getId()}`;
        let connection = mysql.createConnection();
        let result = await mysql.select(sql, connection);
        res.status(200).json({status: 200, message: "Registro obtenido", result: result});

    } catch(error: any) {
        res.status(400).json({status: 400, message: error.message,});
    }
}

export async function deleteById(req: Request, res: Response) {
    try {
        const id = (Number(req.body.id));

        const {error, value} = DeleteSchema.validate({id: id});
        if (error) {
            throw new Error(error.message);
        }

        mysql.setId(id);

        const sql = `DELETE FROM users WHERE id=${mysql.getId()}`;
        let connection = mysql.createConnection();
        let result = await mysql.delete(sql, connection);
        res.status(200).json({status: 200, message: "Registro deleted", result: result});

    } catch(error: any) {
        res.status(400).json({status: 400, message: error.message,});
    }
}

export async function hacerOperacion(req: Request, res: Response) {
    try {
        const body = req.body;

        const {error, value} = OperacionSchema.validate({...body});
        if (error) {
            throw new Error(error.message);
        }

        mysql.setId(Number(body.id));

        const sql = `SELECT rol FROM users WHERE id=${mysql.getId()}`;
        let connection = mysql.createConnection();

        let rol: unknown = await mysql.select(sql, connection);
        
        if(rol instanceof Array) {
            if(rol[0].rol.toUpperCase() === "ADMIN") {
                res.status(201).json({status: 201, message: `Operación ${body.operacion} hecha`});
            } else {
                res.status(401).json({status: 401, message: `Not authorized`});
            }
        } else {
            res.status(401).json({status: 401, message: `Not authorized`});
        }
        
    } catch(error: any) {
        res.status(400).json({status: 400, message: error.message});
    }   
}