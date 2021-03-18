import Router from '@koa/router';
import TeamController from "../../../../controllers/v1/TeamController";
import authValidator from "../../../../middlewares/authValidator";

const teamRouter = new Router();

teamRouter.use(['/team'], authValidator);
teamRouter.put('/team/new', TeamController.createNewTeam);

export default teamRouter;
