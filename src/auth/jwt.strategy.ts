import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./auth.entity";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(User) private readonly repo: Repository<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiresIn: false,
            secretOrKey: 'secret',
        });
    }
    async validate(payload: any, req: Request) {
        if (!payload) {
            throw new UnauthorizedException()
        }
        const user = await this.repo.findOneBy({ email: payload.email })
        if (!user) {
            throw new UnauthorizedException()
        }
        delete user.password
        req.user = user
        return req.user
    }
}