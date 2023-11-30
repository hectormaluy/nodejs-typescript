import Joi from "joi";

 const schema = Joi.object({
    id: Joi.number().required(),
    nombre: Joi.string().required(),
    email: Joi.string().required(),  
});

export default schema;