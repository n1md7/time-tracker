import bcrypt from "bcrypt";

export default class StringUtils {

    public static async hashPassword(password: string): Promise<string> {

        const saltRounds = 10;

        return await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, (error, hash) => {
                if (error) {
                    reject(error);
                }

                resolve(hash);
            });
        });
    }

    public static async hashCompare(password: string, hash: string): Promise<boolean> {

        return await bcrypt.compare(password, hash);
    }

}
