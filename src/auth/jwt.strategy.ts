import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./auth.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(User) private readonly repo: Repository<User>) {
        super({
            ignoreExpiresIn: false,
            secretOrKey: 'secret',
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => {
                return req?.cookies?.Authentication;
            }]),
        });
    }
    async validate(payload: any, req: Request) {
        if (!payload) {
            throw new UnauthorizedException('Payload not found!');
        }
        const user = await this.repo.findOneBy({ email: payload.email })
        if (!user) {
            throw new UnauthorizedException("User not found!")
        }
        // @ts-ignore
        req.user = user;
        // @ts-ignore
        return req.user;
    }
}