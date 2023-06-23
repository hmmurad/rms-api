import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarksController } from './marks.controller';
import { MarksService } from './marks.service';
import { Marks } from './marks.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Marks])
    ],
    controllers: [MarksController],
    providers: [MarksService],
})
export class MarksModule { };