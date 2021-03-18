import UserModel, {UserRole, UserStatus, UserType} from "../../models/sequelize/UserModel";
import UserFactory from "../UserFactory";

export default async function createAdminUser(): Promise<UserType> {
    const generatedUser = await new UserFactory().generate({
        firstName: 'Admin',
        lastName: 'Nimda',
        jobPosition: 'Full-stack Developer',
        personalNumber: '19000001087',
        password: process.env.ADMIN_USER_PASSWORD || 'admin.nimda',
        confirmPassword: 'admin.nimda',
        email: 'admin@admin.com'
    });
    const userModel = new UserModel();
    const savedUser = await userModel.addNewUser(generatedUser);
    await userModel.updateRoleById(savedUser.id, UserRole.admin);
    await userModel.updateStatusById(savedUser.id, UserStatus.active);

    return savedUser;
}
