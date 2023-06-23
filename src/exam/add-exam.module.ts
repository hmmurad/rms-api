import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamController } from './add-exam.controller';
import { Exam } from './add-exam.entity';
import { ExamService } from './add-exam.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Exam])
    ],
    controllers: [ExamController],
    providers: [ExamService],
})
export class ExamModule { };