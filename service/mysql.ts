import mysql from "mysql2";
import { ejecutarQuery } from "../utils/mysql";

export class Mysql {
    protected id: number| undefined;
    protected nombre = "";
    protected email = "";
    protected password = "";
    protected rol = "";

   getId() {
        return this.id;
    }
    setId(id: number) {
        this.id = id;
    }
    setNombre(value: string) {
        this.nombre = value;
    }
    getNombre() {
        return this.nombre;
    }
    setEmail(value: string) {
        this.email = value;
    }
    getEmail() {
        return this.email;
    }
    setPassword(value: string) {
        this.password = value;
    }
    getPassword() {
        return this.password;
    }
    setRol(value: string) {
        this.rol = value;
    }
    getRol() {
        return this.rol;
    }
    createConnection() {
      let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3307,
        password: '123456',
        database: 'examen'
    });
    return connection;
    }
    async insert(sql: string, con: any) {
      let resultado = await ejecutarQuery(con, sql);
      return resultado;
    }
    async select(sql: string, con: any) {
      let resultado = await ejecutarQuery(con, sql);
      return resultado;
    }
    async update(sql: string, con: any) {
        let resultado = await ejecutarQuery(con, sql);
        return resultado;
    }
    async delete(sql: string, con: any) {
        let resultado = await ejecutarQuery(con, sql);
        return resultado;
    }
  }