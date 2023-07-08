import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultController } from './result.controller';
import { Result } from './result.entity';
import { ResultService } from './result.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Result])
    ],
    controllers: [ResultController],
    providers: [ResultService],
})
export class ResultModule { };