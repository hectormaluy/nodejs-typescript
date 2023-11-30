import Joi from "joi";

 const schema = Joi.object({
    id: Joi.number().required(),
    operacion: Joi.string().required(),
});

export default schema;