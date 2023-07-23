import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { MarksModel } from './marks.dto';
import { MarksService } from './marks.service';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('marks')
export class MarksController {
    constructor(private marksService: MarksService) { }

    @Post('')
    @UseGuards(AuthGuard('jwt'), ACGuard)
    create(@Body() dto: MarksModel) {
        return this.marksService.create(dto)
    }

    @Get('')
    findAll(@Query() query?: any) {
        return this.marksService.getAll(query)
    }
    @Get(':id')
    @UseGuards(AuthGuard('jwt'), ACGuard)
    find(@Param('id') id: number) {
        return this.marksService.findOne(id)
    }

    @Patch(':id')
    @UseRoles({
        possession: 'any',
        action: 'create',
        resource: 'mark'
    })
    update(@Param('id') id: number, dto: any) {
        return this.marksService.update(id, dto)
    }

    @Delete(':id')
    @UseRoles({
        possession: 'any',
        action: 'create',
        resource: 'mark'
    })
    delete(@Param('id') id: number) {
        return this.marksService.delete(id)
    }






}