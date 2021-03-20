import Router from '@koa/router';
import TeamController from "../../../../controllers/v1/TeamController";
import authValidator from "../../../../middlewares/authValidator";

const teamRouter = new Router();

teamRouter.use(['/team', '/teams'], authValidator);
teamRouter.get('/teams', TeamController.getUserTeams);
teamRouter.delete('/team/:id', TeamController.removeTeamById);
teamRouter.put('/team/new', TeamController.createNewTeam);

export default teamRouter;
