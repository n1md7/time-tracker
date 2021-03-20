import BaseController from './BaseController';
import TeamInterface from "./interfaces/TeamInterface";
import TeamModelSequelize from "../../models/sequelize/TeamModel";
import {createTeamSchema} from './validators/TeamRequestValidator';
import {HttpCode} from '../../types/errorHandler';
import {MyContext} from '../../types/koa';
import {RequestValidationException} from "../../exceptions";
import Joi from 'joi';
import {removeTeamSchema} from "./validators/TeamRequestValidator";

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

    public async getUserTeams(ctx: MyContext): Promise<void> {

        const model = new TeamModelSequelize();

        ctx.body = await model.getTeamsByUserId(ctx.store.userId);
    }


    public async removeTeamById(ctx: MyContext): Promise<void> {
        const id = Number(ctx.params.id);
        const validation = removeTeamSchema.validate({id});
        if (validation.error as Joi.ValidationError) {
            throw new RequestValidationException(validation.error.details);
        }
        const model = new TeamModelSequelize();
        await model.removeTeamById(validation.value.id, ctx.store.userId);

        ctx.status = HttpCode.accepted;
    }

}

export default new TeamController;
