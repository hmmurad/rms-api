import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { DepartmentModel } from './department.model';
import { DepartmentService } from './department.service';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('departments')
export class DepartmentController {
    constructor(private departmentService: DepartmentService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    get() {
        return this.departmentService.getAll()
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), ACGuard)
    @UseRoles({
        possession: 'any',
        action: 'delete',
        resource: 'class'
    })
    createPost(@Body() dto: DepartmentModel) {
        return this.departmentService.create(dto)
    }

    @Get(':id')
    findOneById(@Param('id') id: number) {
        return this.departmentService.find(id)
    }

    @Get(':departmentname')
    findByClassname(@Param('subjectname') departmentname: string) {
        return this.departmentService.findByDepartmentname(departmentname)
    }

    @Patch(':id')
    updateClass(@Param('id') id: number, @Body() dto: DepartmentModel) {
        return this.departmentService.update(id, dto)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.departmentService.delete(id)
    }
}