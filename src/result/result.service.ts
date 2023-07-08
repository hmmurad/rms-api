import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Result } from "./result.entity";
import { MarksService } from "src/marks/marks.service";

@Injectable()

export class ResultService {
    constructor(
        @InjectRepository(Result) private repo: Repository<Result>
    ) { }


    getAll() {
        return 'this.marksService.getAll()'
    }
}