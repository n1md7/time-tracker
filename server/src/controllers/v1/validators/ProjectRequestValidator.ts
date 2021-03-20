import Joi from 'joi';

export const createProjectSchema = Joi.object({
    name: Joi.string().min(2).max(128).required().label('Project name'),
    description: Joi.string().max(512).optional().allow('').label('Project description'),
});
