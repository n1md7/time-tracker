import Joi from 'joi';

export const createProjectSchema = Joi.object({
    name: Joi.string().min(2).max(128).required().label('Project name'),
    description: Joi.string().max(512).optional().allow('').label('Project description'),
});

export const removeProjectSchema = Joi.object({
    id: Joi.number().positive().greater(0).required().label('Project ID'),
});

export const updateProjectSchema = Joi.object({
    id: Joi.number().positive().greater(0).required().label('Project ID'),
    name: Joi.string().min(2).max(128).required().label('Project name'),
    description: Joi.string().max(512).optional().allow('').label('Project description'),
});