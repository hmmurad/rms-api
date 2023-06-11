import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { StudentModel } from './student.model';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
    constructor(private studentService: StudentService) { }

    @Get()
    get() {
        return this.studentService.getAll()
    }

    @Post()
    createPost(@Body() dto: StudentModel) {
        return this.studentService.create(dto)
    }

    @Get(':id')
    findOneById(@Param('id') id: number) {
        return this.studentService.find(id)
    }

    @Get(':fullname')
    findByClassname(@Param('fullname') fullname: string) {
        return this.studentService.findByStudentname(fullname)
    }

    @Patch(':id')
    updateClass(@Param('id') id: number, @Body() dto: StudentModel) {
        return this.studentService.update(id, dto)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.studentService.delete(id)
    }
}