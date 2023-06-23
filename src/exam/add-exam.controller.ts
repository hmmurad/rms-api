import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ExamModel, } from './add-exam.model';
import { ExamService } from './add-exam.service';

@Controller('exams')
export class ExamController {
    constructor(private examService: ExamService) { }

    @Get()
    get() {
        return this.examService.getAll()
    }

    @Post()
    createPost(@Body() dto: ExamModel) {
        return this.examService.create(dto)
    }

    @Get(':id')
    findOneById(@Param('id') id: number) {
        return this.examService.find(id)
    }

    @Get(':year')
    findByYear(@Param('year') year: string) {
        return this.examService.findByYear(year)
    }

    @Patch(':id')
    updateClass(@Param('id') id: number, @Body() dto: ExamModel) {
        return this.examService.update(id, dto)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.examService.delete(id)
    }
}