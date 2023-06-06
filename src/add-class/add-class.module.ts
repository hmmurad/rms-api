import { Module } from '@nestjs/common';
import { ClassController } from './add-class.controller';

@Module({
    controllers: [ClassController],
    providers: [],
})
export class ClassModule { };