import Joi from "joi";

export const createJobSchema = Joi.object({
    title : Joi.string().min(2).max(50).required(),
    description : Joi.string().min(10).required(),
    location : Joi.string().min(2).max(50).required(),
    category : Joi.string().required(),
    salary : Joi.number().required(),
    expireDate: Joi.date().iso().required(),  
    status: Joi.string().valid("open", "closed")
});