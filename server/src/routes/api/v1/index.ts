import Router from '@koa/router';
import userRouter from './users';
import infoRouter from './info';
import projectRouter from './project';
import teamRouter from './team';
import memberRouter from './member';

const apiRoute = new Router();
const combineApiRoutes = [
    userRouter.routes(),
    infoRouter.routes(),
    projectRouter.routes(),
    teamRouter.routes(),
    memberRouter.routes(),
];
apiRoute.use('/v1', ...combineApiRoutes);

export default apiRoute;
