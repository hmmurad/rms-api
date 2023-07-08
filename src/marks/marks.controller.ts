import { Body, Controller, Get, Post, Query, Param } from '@nestjs/common';
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

    @Get('/results')
    getResult() {
        return this.marksService.getIResult()
    }


    @Get(':studentId')
    get(@Param('studentId') studentId: any) {
        return this.marksService.find(studentId)
    }

}