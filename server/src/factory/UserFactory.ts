import {RequestUserType} from "../models/sequelize/UserModel";
import mocker from 'mocker-data-generator';

export default class UserFactory {

    public async generate(requestParam?: RequestUserType): Promise<RequestUserType> {
        if (requestParam) {
            return requestParam;
        }
        // Or generate new user by random data
        const generatedData = await mocker()
            .schema('users', {
                firstName: {
                    faker: 'name.firstName'
                },
                lastName: {
                    faker: 'name.lastName'
                },
                jobPosition: {
                    casual: 'title'
                },
                personalNumber: {
                    chance: 'integer({"min": 10000000000, "max": 99999999999})'
                },
                password: {
                    casual: 'word'
                },
                confirmPassword: {
                    function: function () {
                        return (
                            this.object.password
                        );
                    }
                },
                email: {
                    function: function () {
                        return (
                            `${this.object.firstName}@${this.object.lastName}.com`
                        )
                    }
                }
            }, 1).build();

        return generatedData.users.pop();
    }
}