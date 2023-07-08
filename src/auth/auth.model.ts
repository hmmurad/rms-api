export enum Role {
    TEACHER = 'teacher',
    ADMIN = 'admin'
}


export class UserModel {
    email: string;
    password: string;
    fullname: string;
    roles: Role

}