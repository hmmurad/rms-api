import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './add-class.entity';
import { Repository } from 'typeorm';
import { ClassModel } from './add-class.model';

@Injectable()
export class ClassService {
    constructor(@InjectRepository(Class) private readonly repo: Repository<Class>) { }

    async create(dto: ClassModel) {
        const findClass = await this.repo.findOneBy({ classname: dto.classname })
        if (findClass) {
            throw new BadRequestException('Class already exists!')

        } else {
            this.repo.create(dto)
            const savedClass = await this.repo.save(dto)
            return { message: 'Saved', savedClass }
        }
    }

    async getAll() {
        return await this.repo.find()
    }

    async find(id: number) {
        const findClass = await this.repo.findOneBy({ id })

        if (findClass) {
            return findClass
        } else {
            throw new BadRequestException('No class found with this id!')
        }
    }

    async findByClassname(classname: string) {
        const findClass = await this.repo.findOneBy({ classname })

        if (findClass) {
            return { message: 'Success', findClass }
        } else {
            throw new BadRequestException('No class found with this name!')
        }
    }

    async update(id: number, dto: ClassModel) {
        const findClass = await this.repo.findOneBy({ id })
        if (findClass) {
            const updatedClass = await this.repo.update(id, dto)
            return { message: 'Updated', updatedClass }
        } else {
            throw new BadRequestException('No class found with this id!')
        }
    }

    async delete(id: number) {
        const findClass = await this.repo.findOneBy({ id })
        if (findClass) {
            const deletedClass = await this.repo.delete(id)
            return { message: 'Deleted', deletedClass }
        } else {
            throw new BadRequestException('No class found with this id!')
        }
    }

}