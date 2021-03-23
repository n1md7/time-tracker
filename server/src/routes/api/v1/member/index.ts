import Router from "@koa/router";
import MemberController from "../../../../controllers/v1/MemberController";
import authValidator from '../../../../middlewares/authValidator';

const memberRouter = new Router();

memberRouter.get('/member/email/:key?', MemberController.getInvitationByEmail);
memberRouter.post('/member/invite',authValidator, MemberController.inviteNewMember);

export default memberRouter;
