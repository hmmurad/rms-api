import { Body, Controller, Get, Post, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModel } from './auth.model';
import { Request, Response } from 'express';
import { JwtGuard } from './jwt.guard';
import { currentUser } from './custom-user.decorator';
import { CurrentUserGuard } from './current-user-guard';
import { User } from './auth.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() dto: UserModel) {
        return await this.authService.create(dto)
    }

    @Post('signin')
    async signin(@Body() dto: UserModel) {
        const { token } = await this.authService.login(dto)
        return { token }

    }

    //check auth status
    @Get('auth-status')
    @UseGuards(CurrentUserGuard)
    authStatus(@currentUser() user: User) {
        return { status: !!user, user }
    }

    // 
    @Post('logout')
    logout(@Req() req: Request, @Res() res: Response) {
        console.log('res');

    }



}