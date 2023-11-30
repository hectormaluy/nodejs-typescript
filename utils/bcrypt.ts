import bcrypt from "bcrypt";

export async function encriptar(password: string) {
    try {
        let hash = await bcrypt.hash(password, 3);
        return hash;
    } catch(error: any) {
        console.error(error);
    }   
}

export async function validar(hash: string, password: string) {
    try {
        let resultado = await bcrypt.compare(password, hash);
        return resultado;
    } catch(error: any) {
        console.error(error);
    }             
}
