import Joi from 'joi';

export const createTeamSchema = Joi.object({
    name: Joi.string().min(2).max(128).required().label('Team name'),
    projectId: Joi.number().positive().required().label('Project ID'),
    description: Joi.string().max(512).optional().allow('').label('Team description'),
});

export const removeTeamSchema = Joi.object({
    id: Joi.number().positive().greater(0).required().label('Team ID'),
});
