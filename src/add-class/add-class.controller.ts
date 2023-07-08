import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/auth.model';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ClassModel } from './add-class.model';
import { ClassService } from './add-class.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('classes')
export class ClassController {
    constructor(private classService: ClassService) { }

    @Get()
    get(@Query() query: any) {
        return this.classService.getAll(query)
    }



    @Post()
    @UseGuards(AuthGuard('jwt'))
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
    @UseGuards(AuthGuard('jwt'))

    updateClass(@Param('id') id: number, @Body() dto: ClassModel) {
        return this.classService.update(id, dto)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))

    remove(@Param('id') id: number) {
        return this.classService.delete(id)
    }
}