import { HttpException, Injectable } from "@nestjs/common";
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
        const findMarks = await this.repo.findOneBy({ studentId: marks.studentId })
        if (findMarks) throw new HttpException('marks exists', 200)
        this.repo.create(marks)
        return await this.repo.save(marks)
    }


    async getAll() {
        return await this.repo.find()
    }
}