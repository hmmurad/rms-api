import { IsNotEmpty, IsString } from "class-validator";

export class ClassModel {
    @IsString()
    @IsNotEmpty()
    classname: string;

    @IsString()
    @IsNotEmpty()
    departmentId: string
    createdAt: Date
}