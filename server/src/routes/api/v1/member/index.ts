import Router from '@koa/router';
import MemberController from '../../../../controllers/v1/MemberController';
import authValidator from '../../../../middlewares/authValidator';

const memberRouter = new Router();

memberRouter.get('/member/email/:key?', MemberController.getInvitationByEmail);
memberRouter.put('/member/accept/invite/:id', authValidator, MemberController.acceptInvitationByInviteId);
memberRouter.put('/member/decline/invite/:id', authValidator, MemberController.declineInvitationByInviteId);
memberRouter.post('/member/invite', authValidator, MemberController.inviteNewMember);

export default memberRouter;
