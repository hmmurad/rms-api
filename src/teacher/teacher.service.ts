import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { TeacherModel } from './teacher.model';

@Injectable()
export class TeacherService {
    constructor(@InjectRepository(Teacher) private readonly repo: Repository<Teacher>) { }

    async create(dto: TeacherModel) {
        const findTeacher = await this.repo.findOneBy({ fullname: dto.fullname })
        if (findTeacher) {
            throw new BadRequestException('Teacher already exists!')

        } else {
            this.repo.create(dto)
            const savedTeacher = await this.repo.save(dto)
            return { message: 'Saved', savedTeacher }
        }
    }

    async getAll() {
        return await this.repo.find()
    }

    async find(id: number) {
        const findTeacher = await this.repo.findOneBy({ id })

        if (findTeacher) {
            return findTeacher
        } else {
            throw new BadRequestException('No Teacher found with this id!')
        }
    }

    async findByTeachername(fullname: string) {
        const findTeacher = await this.repo.findOneBy({ fullname })

        if (findTeacher) {
            return { message: 'Success', findTeacher }
        } else {
            throw new BadRequestException('No Teacher found with this name!')
        }
    }

    async update(id: number, dto: TeacherModel) {
        const findTeacher = await this.repo.findOneBy({ id })
        if (findTeacher) {
            const updatedTeacher = await this.repo.update(id, dto)
            return { message: 'Updated', updatedTeacher }
        } else {
            throw new BadRequestException('No Teacher found with this id!')
        }
    }

    async delete(id: number) {
        const findTeacher = await this.repo.findOneBy({ id })
        if (findTeacher) {
            const deletedTeacher = await this.repo.delete(id)
            return { message: 'Deleted', deletedTeacher }
        } else {
            throw new BadRequestException('No Teacher found with this id!')
        }
    }

}