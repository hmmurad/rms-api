import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './add-exam.entity';
import { ExamModel } from './add-exam.model';

@Injectable()
export class ExamService {
    constructor(@InjectRepository(Exam) private readonly repo: Repository<Exam>) { }

    async create(dto: ExamModel) {
        const findExam = await this.repo.findOneBy({ examname: dto.examname })
        if (findExam) {
            throw new BadRequestException('Exam already exists!')

        } else {
            this.repo.create(dto)
            const savedExam = await this.repo.save(dto)
            return { message: 'Saved', savedExam }
        }
    }

    async getAll() {
        return await this.repo.find()
    }

    async find(id: number) {
        const findExam = await this.repo.findOneBy({ id })

        if (findExam) {
            return findExam
        } else {
            throw new BadRequestException('No exam found with this id!')
        }
    }

    async findByYear(examname: any) {
        const findExam = await this.repo.findOneBy({ examname })

        if (findExam) {
            return { message: 'Success', findExam }
        } else {
            throw new BadRequestException('No class found with this name!')
        }
    }

    async update(id: number, dto: ExamModel) {
        const findExam = await this.repo.findOneBy({ id })
        if (findExam) {
            const updatedExam = await this.repo.update(id, dto)
            return { message: 'Updated', updatedExam }
        } else {
            throw new BadRequestException('No session found with this id!')
        }
    }

    async delete(id: number) {
        const findExam = await this.repo.findOneBy({ id })
        if (findExam) {
            const deletedExam = await this.repo.delete(id)
            return { message: 'Deleted', deletedExam }
        } else {
            throw new BadRequestException('No exam found with this id!')
        }
    }

}