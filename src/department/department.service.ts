import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { DepartmentModel } from './department.model';

@Injectable()
export class DepartmentService {
    constructor(@InjectRepository(Department) private readonly repo: Repository<Department>) { }

    async create(dto: DepartmentModel) {
        const findDepartment = await this.repo.findOneBy({ departmentname: dto.departmentname })
        if (findDepartment) {
            throw new BadRequestException('Department already exists!')

        } else {
            this.repo.create(dto)
            const savedDepartment = await this.repo.save(dto)
            return { message: 'Saved', savedDepartment }
        }
    }

    async getAll() {
        return await this.repo.find()
    }

    async find(id: number) {
        const findDepartment = await this.repo.findOneBy({ id })

        if (findDepartment) {
            return findDepartment
        } else {
            throw new BadRequestException('No Department found with this id!')
        }
    }

    async findByDepartmentname(departmentname: string) {
        const findDepartment = await this.repo.findOneBy({ departmentname })

        if (findDepartment) {
            return { message: 'Success', findDepartment }
        } else {
            throw new BadRequestException('No Department found with this name!')
        }
    }

    async update(id: number, dto: DepartmentModel) {
        const findDepartment = await this.repo.findOneBy({ id })
        if (findDepartment) {
            const updatedDepartment = await this.repo.update(id, dto)
            return { message: 'Updated', updatedDepartment }
        } else {
            throw new BadRequestException('No Department found with this id!')
        }
    }

    async delete(id: number) {
        const findDepartment = await this.repo.findOneBy({ id })
        if (findDepartment) {
            const deletedDepartment = await this.repo.delete(id)
            return { message: 'Deleted', deletedDepartment }
        } else {
            throw new BadRequestException('No Department found with this id!')
        }
    }

}