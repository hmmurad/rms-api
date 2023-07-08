import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModel } from './auth.model';
import { Response } from 'express';
import { JwtGuard } from './jwt.guard';
import { currentUser } from './custom-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() dto: UserModel) {
        return await this.authService.create(dto)
    }

    @Post('signin')
    async signin(@Body() dto: UserModel) {
        const { user, token } = await this.authService.login(dto)
        return { user, token }

    }

    //check auth status
    @Get('auth-status')
    @UseGuards(JwtGuard)
    authStatus(@currentUser() user: UserModel) {
        return { status: !!user, user }
    }


}