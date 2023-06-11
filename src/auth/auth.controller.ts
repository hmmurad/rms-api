import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModel } from './auth.model';
import { Response } from 'express';
import { CurrentUserGuard } from './current-user.guard';
import { currentUser } from './custom-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() dto: UserModel) {
        return await this.authService.create(dto)
    }

    @Post('signin')
    async signin(@Body() dto: UserModel, @Res() res: Response) {
        const { user, token } = await this.authService.login(dto)
        res.cookie('IsAuthenticated', true, { maxAge: 2 * 60 * 1000 })
        res.cookie('Authentication', token, { maxAge: 2 * 60 * 1000, httpOnly: true })
        return res.send({ success: true, user })
    }

    //check auth status
    @Get('auth-status')
    @UseGuards(CurrentUserGuard)
    authStatus(@currentUser() user: UserModel) {
        return { status: !!user, user }
    }
    //logout
    @Get('logout')
    logout(@Res() res: Response) {
        res.clearCookie('Authentication');
        res.clearCookie('IsAuthenticated');
        return res.send({ success: true, message: 'Logout success' }).status(200)
    }


}