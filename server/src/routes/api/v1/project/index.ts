import Router from '@koa/router';
import ProjectController from "../../../../controllers/v1/ProjectController";
import authValidator from "../../../../middlewares/authValidator";

const projectRouter = new Router();

projectRouter.use(['/project', '/projects'], authValidator);
projectRouter.get('/projects', ProjectController.getUserProjects);
projectRouter.put('/project/new', ProjectController.createNewProject);

export default projectRouter;
