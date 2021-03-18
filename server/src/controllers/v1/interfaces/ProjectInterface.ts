import {MyContext} from '../../../types/koa';

export default interface ProjectInterface {
    createNewProject: (ctx: MyContext) => Promise<void>,
    getUserProjects: (ctx: MyContext) => Promise<void>,
}
