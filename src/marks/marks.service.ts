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

        console.log(findMarks);

        if (findMarks) {

            throw new BadRequestException('marks already exists!')

        } else {
            console.log('no marks found');

            this.repo.create(marks)
            const savedmarks = await this.repo.save(marks)
            return { message: 'Saved', savedmarks }
        }
    }

    async getAll(query?: string): Promise<MarksModel[]> {
        const myQuery = await this.repo
            .createQueryBuilder('marks')
            .leftJoinAndSelect('marks.class', 'class')
            .leftJoinAndSelect('marks.student', 'student')
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
            return await myQuery.getMany();
        } else {
            return await myQuery.getMany();
        }
    }

    async find(studentId: any) {
        const findmarks = await this.repo.findOneBy({ studentId })

        if (findmarks) {
            return { message: 'Success', findmarks }
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


    async getIResult() {
        const IResult = await this.repo.find()

        const res = Array.from(new Set(IResult.map((item: any) => item.studentId)))


        // console.log(res);
        for (let i = 0; i < res.length; i++) {
            // console.log(res[i]);
            const student = await this.repo.findBy({ studentId: res[i] })
            console.log(student);

            // console.log(student[res[i]]?.classId);
            // console.log(student[i].assignment + student[i].tutorial + student[i].attendance + student[i].written);

            for (let stdCount = 0; stdCount < student.length; stdCount++) {
                const ISubMarks = student[stdCount].assignment + student[stdCount].tutorial + student[stdCount].attendance + student[stdCount].written
                console.log('Individual Subject Marks = ' + ISubMarks);

                // let totalMarks = 0
                // totalMarks += ISubMarks[stdCount]
                // for (let IMarks = 0; IMarks < 5; ++IMarks) {
                //     totalMarks += ISubMarks[IMarks]
                // console.log(totalMarks);

                // }

            }

        }

        // Calculate the sum of values for each ID
        // const idSums: Record<number, number> = {};
        // for (const entry of IResult) {
        //     const { studentId, assignment, attendance, tutorial, written } = entry;
        //     idSums[studentId] = idSums[studentId] ? idSums[studentId] + assignment + attendance + tutorial + written : assignment + attendance + tutorial + written;
        // }

        // Print the ID sums
        // console.log(idSums);

    }
}