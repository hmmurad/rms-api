import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassModule } from './add-class/add-class.module';
import { SubjectModule } from './subject/subject.module';
import { DepartmentModule } from './department/department.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';
import { ResultModule } from './result/result.module';

@Module({
  imports: [
    ClassModule,
    SubjectModule,
    DepartmentModule,
    StudentModule,
    TeacherModule,
    AuthModule,
    ResultModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'rms',
      host: 'localhost',
      port: 3306,
      password: '123456',
      username: 'root',
      autoLoadEntities: true,
      synchronize: true
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
