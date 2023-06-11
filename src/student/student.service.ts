import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { StudentModel } from './student.model';

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private readonly repo: Repository<Student>) { }

    async create(dto: StudentModel) {
        const findStudent = await this.repo.findOneBy({ fullname: dto.fullname })
        if (findStudent) {
            throw new BadRequestException('Student already exists!')

        } else {
            this.repo.create(dto)
            const savedStudent = await this.repo.save(dto)
            return { message: 'Saved', savedStudent }
        }
    }

    async getAll() {
        return await this.repo.find()
    }

    async find(id: number) {
        const findStudent = await this.repo.findOneBy({ id })

        if (findStudent) {
            return findStudent
        } else {
            throw new BadRequestException('No Student found with this id!')
        }
    }

    async findByStudentname(fullname: string) {
        const findStudent = await this.repo.findOneBy({ fullname })

        if (findStudent) {
            return { message: 'Success', findStudent }
        } else {
            throw new BadRequestException('No Student found with this name!')
        }
    }

    async update(id: number, dto: StudentModel) {
        const findStudent = await this.repo.findOneBy({ id })
        if (findStudent) {
            const updatedStudent = await this.repo.update(id, dto)
            return { message: 'Updated', updatedStudent }
        } else {
            throw new BadRequestException('No Student found with this id!')
        }
    }

    async delete(id: number) {
        const findStudent = await this.repo.findOneBy({ id })
        if (findStudent) {
            const deletedStudent = await this.repo.delete(id)
            return { message: 'Deleted', deletedStudent }
        } else {
            throw new BadRequestException('No Student found with this id!')
        }
    }

}