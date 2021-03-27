import Router from '@koa/router';
import InfoController from '../../../../controllers/v1/InfoController';

const infoRouter = new Router();

infoRouter.get('/info/auth', InfoController.authInfo);

export default infoRouter;
