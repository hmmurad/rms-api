import { Controller, Get } from '@nestjs/common';

@Controller('class')
export class ClassController {
    constructor() { }

    @Get()
    get() {
        return 'add class'
    }
}