import Joi from "joi";

 const schema = Joi.object({
    id: Joi.number().required(),
});

export default schema;