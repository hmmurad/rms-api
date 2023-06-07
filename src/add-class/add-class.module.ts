import { Module } from '@nestjs/common';
import { ClassController } from './add-class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './add-class.entity';
import { ClassService } from './add-class.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Class])
    ],
    controllers: [ClassController],
    providers: [ClassService],
})
export class ClassModule { };