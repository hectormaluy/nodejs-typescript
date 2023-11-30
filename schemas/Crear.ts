import Joi from "joi";

 const schema = Joi.object({
    nombre: Joi.string().required(),
    email: Joi.string().required(),  
    password: Joi.string().required(), 
    rol: Joi.string().required()
});

export default schema;