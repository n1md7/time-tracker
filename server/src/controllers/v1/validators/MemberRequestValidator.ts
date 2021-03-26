import Joi from 'joi';

export const inviteMemberSchema = Joi.object({
    email: Joi.string().min(6).max(128).email().required().label('E-mail address'),
    teamId: Joi.number().positive().required().label('Team Id'),
});

export const inviteKeySchema = Joi.object({
    key: Joi.string().min(10).max(64).required().label('Invitation key'),
});

export const inviteIdSchema = Joi.object({
    id: Joi.number().positive().required().label('Invitation ID'),
});
