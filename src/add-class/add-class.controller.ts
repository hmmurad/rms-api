import { Body, Controller, Delete, Get, Patch, Post, Query, Param } from '@nestjs/common';
import { ClassModel } from './add-class.model';
import { ClassService } from './add-class.service';

@Controller('classes')
export class ClassController {
    constructor(private classService: ClassService) { }

    @Get()
    get() {
        return this.classService.getAll()
    }

    @Post()
    createPost(@Body() dto: ClassModel) {
        return this.classService.create(dto)
    }

    @Get(':id')
    findOneById(@Param('id') id: number) {
        return this.classService.find(id)
    }

    @Get(':classname')
    findByClassname(@Param('classname') classname: string) {
        return this.classService.findByClassname(classname)
    }

    @Patch(':id')
    updateClass(@Param('id') id: number, @Body() dto: ClassModel) {
        return this.classService.update(id, dto)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.classService.delete(id)
    }
}