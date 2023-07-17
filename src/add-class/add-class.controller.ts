import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClassModel } from './add-class.model';
import { ClassService } from './add-class.service';
import { currentUser } from 'src/auth/custom-user.decorator';
import { User } from 'src/auth/auth.entity';
import { CurrentUserGuard } from 'src/auth/current-user-guard';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('classes')
export class ClassController {
    constructor(private classService: ClassService) { }


    @Get()
    @UseGuards(AuthGuard('jwt'), ACGuard)
    @UseRoles({
        possession: 'any',
        action: 'read',
        resource: 'class'
    })
    get(@Query() query: any, @currentUser() user: User) {
        console.log(user);
        return this.classService.getAll(query)
    }




    @Post()
    @UseGuards(AuthGuard('jwt'), ACGuard)
    @UseRoles({
        possession: 'any',
        action: 'create',
        resource: 'class'
    })
    createPost(@Body() dto: ClassModel, @currentUser() user: User) {
        console.log(user);

        return this.classService.create(dto)
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'), ACGuard)
    @UseRoles({
        possession: 'any',
        action: 'read',
        resource: 'class'
    })
    findOneById(@Param('id') id: number) {
        return this.classService.find(id)
    }

    @Get(':classname')
    @UseGuards(AuthGuard('jwt'), ACGuard)
    @UseRoles({
        possession: 'any',
        action: 'read',
        resource: 'class'
    })
    findByClassname(@Param('classname') classname: string) {
        return this.classService.findByClassname(classname)
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'), ACGuard)
    @UseRoles({
        possession: 'any',
        action: 'update',
        resource: 'class'
    })

    updateClass(@Param('id') id: number, @Body() dto: ClassModel) {
        return this.classService.update(id, dto)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), ACGuard)
    @UseRoles({
        possession: 'any',
        action: 'delete',
        resource: 'class'
    })

    remove(@Param('id') id: number) {
        return this.classService.delete(id)
    }
}