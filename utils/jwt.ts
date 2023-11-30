import jwt from "jsonwebtoken";

type Body = {email: string}

export function crearToken(body:Body):string {
    let token = jwt.sign(body, "secret");
    return token;
}


