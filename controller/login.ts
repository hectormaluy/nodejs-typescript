import { Request, Response, NextFunction } from "express";
import {validar} from "../utils/bcrypt";
import {Mysql} from "../service/mysql";
import LoginSchema from "../schemas/Login";
import ProfileSchema from "../schemas/Profile";
import { crearToken } from "../utils/jwt";

export async function login(req: Request, res: Response) {
    try {
        const mysql = new Mysql();
        const body = req.body;

        const {error, value} = LoginSchema.validate({...body});
        if (error) {
            throw new Error(error.message);
        }
        mysql.setEmail(body.email);
        mysql.setPassword(body.password);

        const sql = `SELECT * FROM users WHERE email="${mysql.getEmail()}"`
        let connection = mysql.createConnection();
        let result = await mysql.select(sql, connection);
       
        if(result instanceof Array) {
            if (result.length === 0) {
                res.status(200).json({status: 200, message: "Email incorrecto."}); 
            } else {
               let email = result[0].email;
               let hash = result[0].password;
               let validacion = await validar(hash,mysql.getPassword());
               if (validacion) {
                let token = crearToken({email});
                res.status(200).json({status: 200, message: "Sesion iniciada", token});
               } else {
                res.status(400).json({status: 400, message: "Not Authorized: Credenciales invalidas"});
               }
            }
        } else {
            res.status(500).json({status: 500, message: "Error en el servidor"}); 
        }
        
    } catch(error: any) {
        res.status(400).json({status: 400, message: error.message,});
    } 
}

export async function profile(req: Request, res: Response) {
    try {
        const mysql = new Mysql();
        const email = <string>req.query.email;

        const {error, value} = ProfileSchema.validate({email});
        if (error) {
            throw new Error(error.message);
        }
        mysql.setEmail(email);
        
        const sql = `SELECT nombre, email, rol FROM users WHERE email="${mysql.getEmail()}"`
        let connection = mysql.createConnection();
        let result = await mysql.select(sql, connection);

        if(result instanceof Array) {
            if (result.length === 0) {
                res.status(200).json({status: 200, message: "Email incorrecto."}); 
            } else {
                res.status(200).json({status: 200, perfil: result[0]}); 
            }
        } else {
            res.status(500).json({status: 500, message: "Error en el servidor"}); 
        }


    } catch(error: any) {
        res.status(400).json({status: 400, message: error.message,});
    } 
}