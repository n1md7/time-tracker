import Joi from 'joi';

export const createUserSchema = Joi.object({
    firstName: Joi.string().min(2).max(32).required().label('First name'),
    lastName: Joi.string().min(2).max(32).required().label('Last name'),
    personalNumber: Joi.string().length(11).required().label('Personal number'),
    jobPosition: Joi.string().min(2).max(128).required().label('Job position'),
    password: Joi.string().min(8).max(128).required().label('Password'),
    confirmPassword: Joi.string().min(8).max(128).required().label('Confirm password'),
    email: Joi.string().min(6).max(128).email().required().label('E-mail address'),
});

export const authUserSchema = Joi.object({
    email: Joi.string().min(5).max(32).required().label('E-mail address'),
    password: Joi.string().min(8).max(128).required().label('Password'),
});
