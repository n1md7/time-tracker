import Router from '@koa/router';
import userRouter from './users';
import infoRouter from './info';

const apiRoute = new Router();
const combineApiRoutes = [
    userRouter.routes(),
    infoRouter.routes(),
];
apiRoute.use('/v1', ...combineApiRoutes);

export default apiRoute;
