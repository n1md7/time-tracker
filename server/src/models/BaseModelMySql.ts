import {initMySql} from "../database"

export default abstract class BaseModelMySql {

    private pool;

    public constructor() {
        this.pool = initMySql();
    }

    protected async query<T>(queryString: string): Promise<T> {
        return await this.pool.query(queryString);
    }

    protected poolClose(): void {
        this.pool.end();
    }

}