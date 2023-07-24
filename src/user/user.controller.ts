import { Controller, Get, Param, Patch, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(

        private userService: UserService
    ) { }

    @Get()
    getAll() {
        return this.userService.findAll()
    }

    @Get(':id')
    find(@Param('id') id: number) {
        return this.userService.findOne(id)
    }
    @Patch(':id')
    update(@Param('id') id: number, dto: any) {
        return this.userService.update(id, dto)
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.userService.delete(id)
    }
}