import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionController } from './add-session.controller';
import { Session } from './add-session.entity';
import { SessionService } from './add-session.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Session])
    ],
    controllers: [SessionController],
    providers: [SessionService],
})
export class SessionModule { };