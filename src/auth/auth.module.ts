import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtGuard } from './jwt.guard';
import { RolesGuard } from './roles.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '60s', algorithm: 'HS512' },
        }),
        PassportModule.register({
            defaultStrategy: 'jwt'
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtGuard, RolesGuard],
})
export class AuthModule { };