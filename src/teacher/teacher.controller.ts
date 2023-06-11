import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TeacherModel } from './teacher.model';
import { TeacherService } from './teacher.service';

@Controller('teachers')
export class TeacherController {
    constructor(private teacherService: TeacherService) { }

    @Get()
    get() {
        return this.teacherService.getAll()
    }

    @Post()
    createPost(@Body() dto: TeacherModel) {
        return this.teacherService.create(dto)
    }

    @Get(':id')
    findOneById(@Param('id') id: number) {
        return this.teacherService.find(id)
    }

    @Get(':fullname')
    findByClassname(@Param('fullname') fullname: string) {
        return this.teacherService.findByTeachername(fullname)
    }

    @Patch(':id')
    updateClass(@Param('id') id: number, @Body() dto: TeacherModel) {
        return this.teacherService.update(id, dto)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.teacherService.delete(id)
    }
}