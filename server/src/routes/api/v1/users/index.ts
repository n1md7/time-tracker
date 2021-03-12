import Router from "@koa/router";
import UserController from "../../../../controllers/v1/UserController";

const userRouter = new Router();

userRouter.get('/users', UserController.users);
userRouter.get('/user', UserController.user);

export default userRouter;
