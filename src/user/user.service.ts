import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>,
    ) { }

    async findAll() {
        return await this.repo.find()
    }



    async findOne(id: number) {
        return await this.repo.findOneBy({ id })
    }

    async update(id: number, dto: any) {
        const user = await this.repo.findOneBy({ id })
        if (user) {
            const updateUser = await this.repo.update(id, dto)
            return { message: 'Updated', updateUser }
        } else {
            throw new BadRequestException('No  User found with this id!')
        }
    }


    async delete(id: any) {
        const user = await this.repo.delete(id)
        if (user) return { user }
        throw new BadRequestException('Something error occurred!')
    }

}