import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { SubjectModel } from './subject.model';

@Injectable()
export class SubjectService {
    constructor(@InjectRepository(Subject) private readonly repo: Repository<Subject>) { }

    async create(dto: SubjectModel) {
        const findSubject = await this.repo.findOneBy({ subjectname: dto.subjectname })
        if (findSubject) {
            throw new BadRequestException('Subject already exists!')

        } else {
            this.repo.create(dto)
            const savedSubject = await this.repo.save(dto)
            return { message: 'Saved', savedSubject }
        }
    }

    async getAll() {
        return await this.repo.find()
    }

    async find(id: number) {
        const findSubject = await this.repo.findOneBy({ id })

        if (findSubject) {
            return findSubject
        } else {
            throw new BadRequestException('No Subject found with this id!')
        }
    }

    async findBySubjectname(subjectname: string) {
        const findSubject = await this.repo.findOneBy({ subjectname })

        if (findSubject) {
            return { message: 'Success', findSubject }
        } else {
            throw new BadRequestException('No Subject found with this name!')
        }
    }

    async update(id: number, dto: SubjectModel) {
        const findSubject = await this.repo.findOneBy({ id })
        if (findSubject) {
            const updatedSubject = await this.repo.update(id, dto)
            return { message: 'Updated', updatedSubject }
        } else {
            throw new BadRequestException('No Subject found with this id!')
        }
    }

    async delete(id: number) {
        const findSubject = await this.repo.findOneBy({ id })
        if (findSubject) {
            const deletedSubject = await this.repo.delete(id)
            return { message: 'Deleted', deletedSubject }
        } else {
            throw new BadRequestException('No Subject found with this id!')
        }
    }

}