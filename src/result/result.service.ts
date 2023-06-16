import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Result } from "./result.entity";

@Injectable()

export class ResultService {
    constructor(
        @InjectRepository(Result) private repo: Repository<Result>
    ) {}
}