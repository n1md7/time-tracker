import Joi from 'joi';

export const createTeamSchema = Joi.object({
    name: Joi.string().min(2).max(128).required().label('Team name'),
    description: Joi.string().max(512).label('Team description'),
    projectId: Joi.number().positive().required().label('Project ID'),
});
