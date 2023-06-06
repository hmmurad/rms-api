import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassController } from './add-class/add-class.controller';
import { ClassModule } from './add-class/add-class.module';

@Module({
  imports: [
    ClassModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'rms',
      host: 'localhost',
      port: 3306,
      password: '123456',
      username: 'root',
      autoLoadEntities: true,
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
