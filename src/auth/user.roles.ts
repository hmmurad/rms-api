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
    .createAny(['class', 'student', 'subject', 'mark'])
    .updateAny(['class', 'student', 'subject', 'mark'])
    .deleteAny(['class', 'student', 'subject', 'mark'])