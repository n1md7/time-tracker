import BaseController from './BaseController';
import TeamInterface from "./interfaces/TeamInterface";
import TeamModelSequelize from "../../models/sequelize/TeamModel";
import {createTeamSchema} from './validators/TeamRequestValidator';
import {HttpCode} from '../../types/errorHandler';
import {MyContext} from '../../types/koa';
import {RequestValidationException} from "../../exceptions";
import Joi from 'joi';

class TeamController extends BaseController implements TeamInterface {

    public async createNewTeam(ctx: MyContext): Promise<void> {
        const validation = createTeamSchema.validate(ctx.request.body);
        if (validation.error as Joi.ValidationError) {
            throw new RequestValidationException(validation.error.details);
        }

        const model = new TeamModelSequelize();
        await model.addNewTeam(validation.value, ctx.store.userId);

        ctx.status = HttpCode.created;
    }

}

export default new TeamController;
