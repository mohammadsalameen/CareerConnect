import Joi from 'joi';

export const registerValidation = Joi.object({
    name : Joi.string().min(2).max(20).required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(6).max(20).required(),
    role : Joi.string().valid('admin', 'employer', 'applicant').default('applicant')
});