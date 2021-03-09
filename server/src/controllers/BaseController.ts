export default class BaseController {
  constructor() {
    throw Error( `${ this.constructor.name } can not be instantiated` );
  }
}
