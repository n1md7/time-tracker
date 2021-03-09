import Router from "@koa/router";
import UserController from "../../../../controllers/UserController";

const userRouter = new Router();

userRouter.get('/users', UserController.users);
userRouter.get('/user', UserController.user);

export default userRouter;
