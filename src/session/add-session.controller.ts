import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SessionModel } from './add-session.model';
import { SessionService } from './add-session.service';

@Controller('sessions')
export class SessionController {
    constructor(private sessionService: SessionService) { }

    @Get()
    get() {
        return this.sessionService.getAll()
    }

    @Post()
    createPost(@Body() dto: SessionModel) {
        return this.sessionService.create(dto)
    }

    @Get(':id')
    findOneById(@Param('id') id: number) {
        return this.sessionService.find(id)

    }

    @Get(':year')
    findByYear(@Param('year') year: string) {
        return this.sessionService.findByYear(year)
    }

    @Patch(':id')
    updateClass(@Param('id') id: number, @Body() dto: SessionModel) {
        return this.sessionService.update(id, dto)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.sessionService.delete(id)
    }
}