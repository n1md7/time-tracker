import BaseController from './BaseController';
import TeamInterface from "./interfaces/TeamInterface";
import TeamModel, {TeamType} from "../../models/sequelize/TeamModel";
import {createTeamSchema, teamInfoSchema} from './validators/TeamRequestValidator';
import {HttpCode} from '../../types/errorHandler';
import {MyContext} from '../../types/koa';
import {RequestValidationException} from "../../exceptions";
import {removeTeamSchema} from "./validators/TeamRequestValidator";
import Joi from 'joi';
import ProjectModel from '../../models/sequelize/ProjectModel';

class TeamController extends BaseController implements TeamInterface {

  public async createNewTeam(ctx: MyContext): Promise<void> {
    const validation = createTeamSchema.validate(ctx.request.body);
    if (validation.error as Joi.ValidationError) {
      throw new RequestValidationException(validation.error.details);
    }

    const model = new TeamModel();
    await model.addNewTeam(validation.value, ctx.store.userId);

    ctx.status = HttpCode.created;
  }

  public async getUserTeams(ctx: MyContext): Promise<void> {

    const model = new TeamModel();
    const teams = await model.getTeamsByUserId(ctx.store.userId);

    ctx.body = teams.sort().reverse();
  }

  public async getTeamInfo(ctx: MyContext): Promise<void> {
    const id = Number(ctx.params.id);
    const validation = teamInfoSchema.validate({id});
    if (validation.error as Joi.ValidationError) {
      throw new RequestValidationException(validation.error.details);
    }
    // TODO: team access control
    const model = new TeamModel();
    const project = new ProjectModel();
    const teamInfo = await model.getTeamById(validation.value.id) as TeamType;
    if (!teamInfo) {
      // TODO change this to dedicated Exception
      throw new Error('No such team Id');
    }

    ctx.body = {
      name: teamInfo.name,
      description: teamInfo.description,
      projectId: teamInfo.projectId,
      projects: await project.getProjectsByUserId(ctx.store.userId)
    };
  }


  public async removeTeamById(ctx: MyContext): Promise<void> {
    const id = Number(ctx.params.id);
    const validation = removeTeamSchema.validate({id});
    if (validation.error as Joi.ValidationError) {
      throw new RequestValidationException(validation.error.details);
    }
    const model = new TeamModel();
    await model.removeTeamById(validation.value.id, ctx.store.userId);

    ctx.status = HttpCode.accepted;
  }

}

export default new TeamController;
