import { Body, Controller, Get, Post } from '@nestjs/common';
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
    findAll() {
        return this.marksService.getAll()
    }
}