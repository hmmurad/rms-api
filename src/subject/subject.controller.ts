import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SubjectModel } from './subject.model';
import { SubjectService } from './subject.service';

@Controller('subjects')
export class SubjectController {
    constructor(private subjectService: SubjectService) { }

    @Get()
    get(@Query() query?: any) {
        return this.subjectService.getAll(query)
    }

    @Post()
    createPost(@Body() dto: SubjectModel) {
        return this.subjectService.create(dto)
    }

    @Get(':id')
    findOneById(@Param('id') id: number) {
        return this.subjectService.find(id)
    }

    @Get(':subjectname')
    findByClassname(@Param('subjectname') subjectname: string) {
        return this.subjectService.findBySubjectname(subjectname)
    }


    @Patch(':id')
    updateClass(@Param('id') id: number, @Body() dto: SubjectModel) {
        return this.subjectService.update(id, dto)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.subjectService.delete(id)
    }
}