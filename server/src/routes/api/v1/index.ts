import Router from '@koa/router';
import userRouter from './users';
import productRouter from './products';

const apiRoute = new Router();
const combineApiRoutes = [
    userRouter.routes(),
    productRouter.routes()
];
apiRoute.use('/v1', ...combineApiRoutes);

export default apiRoute;
