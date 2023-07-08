import { Controller, Get } from '@nestjs/common';
import { ResultService } from './result.service';

@Controller('results')
export class ResultController {
    constructor(private resultService: ResultService) { }

    @Get()
    findAll() {
        return this.resultService.getAll()
    }
}