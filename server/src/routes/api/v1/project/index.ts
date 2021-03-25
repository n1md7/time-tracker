import Router from '@koa/router';
import ProjectController from "../../../../controllers/v1/ProjectController";
import authValidator from "../../../../middlewares/authValidator";

const projectRouter = new Router();

projectRouter.use(['/project', '/projects'], authValidator);
projectRouter.get('/projects', ProjectController.getUserProjects);
projectRouter.post('/project', ProjectController.createNewProject);
projectRouter.put('/project/:id', ProjectController.createNewProject);
projectRouter.delete('/project/:id', ProjectController.removeProjectById);

export default projectRouter;
