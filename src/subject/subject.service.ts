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

    async getAll(query?: string): Promise<Subject[]> {
        const myQuery = await this.repo
            .createQueryBuilder('subjects')
            .leftJoinAndSelect('subjects.class', 'class')
            .leftJoinAndSelect('subjects.teacher', 'teacher');

        if (Object.keys(query).length !== 0 && query.constructor === Object) {
            const queryKeys = Object.keys(query);

            if (queryKeys.includes('teacher')) {
                myQuery.andWhere('teacher.id = :teacherId', {
                    teacherId: query['teacher'],
                });
            }

            if (queryKeys.includes('class')) {
                myQuery.andWhere('class.id = :classId', {
                    classId: query['class'],
                });
            }
            return await myQuery.getMany();
        } else {
            return await myQuery.getMany();
        }
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