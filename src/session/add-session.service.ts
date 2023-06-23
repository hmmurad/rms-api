import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './add-session.entity';
import { SessionModel } from './add-session.model';

@Injectable()
export class SessionService {
    constructor(@InjectRepository(Session) private readonly repo: Repository<Session>) { }

    async create(dto: SessionModel) {
        const findClass = await this.repo.findOneBy({ year: dto.year })
        if (findClass) {
            throw new BadRequestException('Class already exists!')

        } else {
            this.repo.create(dto)
            const savedSession = await this.repo.save(dto)
            return { message: 'Saved', savedSession }
        }
    }

    async getAll() {
        return await this.repo.find()
    }

    async find(id: number) {
        const findSession = await this.repo.findOneBy({ id })

        if (findSession) {
            return findSession
        } else {
            throw new BadRequestException('No session found with this id!')
        }
    }

    async findByYear(year: any) {
        const findYear = await this.repo.findOneBy({ year })

        if (findYear) {
            return { message: 'Success', findYear }
        } else {
            throw new BadRequestException('No class found with this name!')
        }
    }

    async update(id: number, dto: SessionModel) {
        const findSession = await this.repo.findOneBy({ id })
        if (findSession) {
            const updatedSession = await this.repo.update(id, dto)
            return { message: 'Updated', updatedSession }
        } else {
            throw new BadRequestException('No session found with this id!')
        }
    }

    async delete(id: number) {
        const findSession = await this.repo.findOneBy({ id })
        if (findSession) {
            const deletedSession = await this.repo.delete(id)
            return { message: 'Deleted', deletedSession }
        } else {
            throw new BadRequestException('No session found with this id!')
        }
    }

}