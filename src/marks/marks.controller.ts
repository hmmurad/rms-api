import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MarksModel } from './marks.dto';
import { MarksService } from './marks.service';

@Controller('marks')
export class MarksController {
    constructor(private marksService: MarksService) { }

    @Post('')
    create(@Body() dto: MarksModel) {
        return this.marksService.create(dto)
    }

    @Get('')
    findAll(@Query() query?: any) {
        return this.marksService.getAll(query)
    }


    @Get(':studentId')
    get(@Param('studentId') studentId: any) {
        return this.marksService.find(studentId)
    }

    @Get('/student/:studentId')
    getOne(@Param('studentId') studentId: any) {
        return this.marksService.findOne(studentId)
    }



}