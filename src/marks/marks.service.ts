import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MarksModel } from "./marks.dto";
import { Marks } from "./marks.entity";

@Injectable()

export class MarksService {
    constructor(
        @InjectRepository(Marks) private repo: Repository<Marks>
    ) { }

    async create(marks: MarksModel) {
        const findMarks = await this.repo.findOneBy({ subjectId: marks.subjectId, classId: marks.classId, studentId: marks.studentId })

        if (findMarks) {

            throw new BadRequestException('marks already exists!')

        } else {
            console.log('no marks found');

            this.repo.create(marks)
            const savedmarks = await this.repo.save(marks)
            return { message: 'Saved', savedmarks }
        }
    }

    async getAll(query?: string) {
        const myQuery = await this.repo
            .createQueryBuilder('marks')
            .leftJoinAndSelect('marks.class', 'class')
            .leftJoinAndSelect('marks.student', 'student')
            .leftJoinAndSelect('marks.subject', 'subject')
            .leftJoinAndSelect('marks.exam', 'exam')

        if (Object.keys(query).length !== 0 && query.constructor === Object) {
            const queryKeys = Object.keys(query);

            if (queryKeys.includes('class')) {
                myQuery.andWhere('class.id = :classId', {
                    classId: query['class'],
                });
            }

            if (queryKeys.includes('exam')) {
                myQuery.andWhere('exam.id = :examId', {
                    examId: query['exam'],
                });
            }
            if (queryKeys.includes('student')) {
                myQuery.andWhere('student.id = :studentId', {
                    studentId: query['student'],
                });
            }
            if (queryKeys.includes('subject')) {
                myQuery.andWhere('subject.id = :subjectId', {
                    subjectId: query['subject'],
                });
            }
            return await myQuery.getMany();
        } else {
            return await myQuery.getMany();
        }
    }

    async find(studentId: any) {
        const findmarks = await this.repo.findBy({
            studentId
        })

        if (findmarks) {
            return findmarks
        } else {
            throw new BadRequestException('No marks found with this id!')
        }
    }
    async findOne(studentId: any) {
        const findmarks = await this.repo.find({
            where: {
                id: studentId
            }
        })

        if (findmarks) {
            return findmarks
        } else {
            throw new BadRequestException('No marks found with this id!')
        }
    }

    async update(id: number, dto: MarksModel) {
        const findmarks = await this.repo.findOneBy({ id })
        if (findmarks) {
            const updatedMarks = await this.repo.update(id, dto)
            return { message: 'Updated', updatedMarks }
        } else {
            throw new BadRequestException('No marks found with this id!')
        }
    }

    async delete(id: number) {
        const findmarks = await this.repo.findOneBy({ id })
        if (findmarks) {
            const deletedMarks = await this.repo.delete(id)
            return { message: 'Deleted', deletedMarks }
        } else {
            throw new BadRequestException('No marks found with this id!')
        }
    }




}