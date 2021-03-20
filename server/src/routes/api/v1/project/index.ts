import Router from '@koa/router';
import ProjectController from "../../../../controllers/v1/ProjectController";
import authValidator from "../../../../middlewares/authValidator";

const projectRouter = new Router();

projectRouter.use(['/project', '/projects'], authValidator);
projectRouter.delete('/project/:id', ProjectController.removeProjectById);
projectRouter.get('/projects', ProjectController.getUserProjects);
projectRouter.put('/projects/new', ProjectController.createNewProject);

export default projectRouter;
