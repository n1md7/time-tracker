import BaseController from './BaseController';
import ProjectInterface from "./interfaces/ProjectInterface";
import ProjectModelSequelize from "../../models/sequelize/ProjectModel";
import {createProjectSchema, removeProjectSchema} from './validators/ProjectRequestValidator';
import {HttpCode} from '../../types/errorHandler';
import {MyContext} from '../../types/koa';
import {RequestValidationException} from "../../exceptions";
import Joi from 'joi';

class ProjectController extends BaseController implements ProjectInterface {

    public async createNewProject(ctx: MyContext): Promise<void> {
        const validation = createProjectSchema.validate(ctx.request.body);
        if (validation.error as Joi.ValidationError) {
            throw new RequestValidationException(validation.error.details);
        }

        const model = new ProjectModelSequelize();
        await model.addNewProject(validation.value, ctx.store.userId);

        ctx.status = HttpCode.created;
    }

    public async getUserProjects(ctx: MyContext): Promise<void> {
        const model = new ProjectModelSequelize();
        const projects = await model.getProjectsByUserId(ctx.store.userId);
        ctx.body = projects.sort().reverse();
    }

    public async removeProjectById(ctx: MyContext): Promise<void> {
        const id = Number(ctx.params.id);
        const validation = removeProjectSchema.validate({id});
        if (validation.error as Joi.ValidationError) {
            throw new RequestValidationException(validation.error.details);
        }
        const model = new ProjectModelSequelize();
        await model.removeProjectById(validation.value.id, ctx.store.userId);

        ctx.status = HttpCode.accepted;
    }
}

export default new ProjectController;
