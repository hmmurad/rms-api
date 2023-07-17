import { RolesBuilder } from "nest-access-control";

export enum UserRoles {
    Admin = 'Admin',
    Teacher = 'Teacher'
}


export const roles: RolesBuilder = new RolesBuilder()


roles.grant(UserRoles.Teacher)
    .readAny(['class', 'student', 'subject', 'mark'])
    .grant(UserRoles.Admin)
    .extend(UserRoles.Teacher)
    .createAny(['class'])
    .updateAny(['class'])
    .deleteAny(['class'])