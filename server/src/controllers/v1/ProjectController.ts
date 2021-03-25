import BaseController from './BaseController';
import ProjectInterface from './interfaces/ProjectInterface';
import ProjectModel from '../../models/sequelize/ProjectModel';
import {createProjectSchema, removeProjectSchema, updateProjectSchema} from './validators/ProjectRequestValidator';
import {HttpCode} from '../../types/errorHandler';
import {MyContext} from '../../types/koa';
import {RequestValidationException} from '../../exceptions';
import Joi from 'joi';

class ProjectController extends BaseController implements ProjectInterface {

  public async createNewProject(ctx: MyContext): Promise<void> {
    const validation = createProjectSchema.validate(ctx.request.body);
    if (validation.error as Joi.ValidationError) {
      throw new RequestValidationException(validation.error.details);
    }

    const model = new ProjectModel();
    await model.addNewProject(validation.value, ctx.store.userId);

    ctx.status = HttpCode.created;
  }

  public async updateProjectById(ctx: MyContext): Promise<void> {
    const validation = updateProjectSchema.validate({
      id: Number(ctx.params.id),
      ...ctx.request.body,
    });
    if (validation.error as Joi.ValidationError) {
      throw new RequestValidationException(validation.error.details);
    }

    const {id, name, description} = validation.value;
    const {userId} = ctx.store;

    const model = new ProjectModel();
    await model.updateNameById(id, userId, name);
    if (description.length) {
      await model.updateDescriptionById(id, userId, description);
    }

    ctx.status = HttpCode.noContent;
  }

  public async getUserProjects(ctx: MyContext): Promise<void> {
    const model = new ProjectModel();
    const projects = await model.getProjectsByUserId(ctx.store.userId);
    ctx.body = projects.sort().reverse();
  }

  public async removeProjectById(ctx: MyContext): Promise<void> {
    const id = Number(ctx.params.id);
    const validation = removeProjectSchema.validate({id});
    if (validation.error as Joi.ValidationError) {
      throw new RequestValidationException(validation.error.details);
    }
    const model = new ProjectModel();
    await model.removeProjectById(validation.value.id, ctx.store.userId);

    ctx.status = HttpCode.accepted;
  }
}

export default new ProjectController;
