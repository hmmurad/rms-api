import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./auth.entity";
import { Repository } from "typeorm";
import { UserModel } from "./auth.model";
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>,
        private jwtService: JwtService
    ) { }

    //register route
    async create(dto: UserModel) {
        const { email } = dto
        const checkUser = await this.repo.findOneBy({ email })
        if (checkUser) throw new UnauthorizedException('Email already exists, try with new one!')
        const newUser = new User();
        Object.assign(newUser, dto)
        this.repo.create(newUser)
        await this.repo.save(newUser)
        return {
            success: true,
            message: 'User Created Successfully',
            newUser
        }
    }
    //login route
    async login(dto: UserModel) {
        // check user
        const user = await this.repo.createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email= :email', { email: dto.email }).getOne()

        if (!user) {
            throw new UnauthorizedException('Bad credentials -email')
        } else {
            if (await this.verifyPassword(dto.password, user.password)) {
                const token = await this.jwtService.signAsync({
                    user
                })
                delete user.password
                return { token, user }
            } else {
                throw new UnauthorizedException('Bad Credentials - pass')
            }
        }
    }
    // To Verify password
    async verifyPassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash)
    }



    async findAll() {
        return await this.repo.find()
    }
}