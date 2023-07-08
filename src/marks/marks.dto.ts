import { IsDecimal, IsNotEmpty, IsNumber } from "class-validator"

export class MarksModel {
    @IsNotEmpty()
    studentId: number
    @IsNotEmpty()
    userId: number
    @IsNotEmpty()
    subjectId: number
    @IsNotEmpty()
    classId: number
    @IsNotEmpty()
    examId: number
    @IsNotEmpty()
    @IsNumber()
    attendance: number
    @IsNotEmpty()
    @IsDecimal()
    assignment: number
    @IsNotEmpty()
    @IsDecimal()
    tutorial: number
    @IsNotEmpty()
    @IsDecimal()
    written: number

}