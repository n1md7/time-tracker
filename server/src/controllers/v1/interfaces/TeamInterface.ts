import {MyContext} from '../../../types/koa';

export default interface ProjectInterface {
    createNewTeam: (ctx: MyContext) => Promise<void>,
}
