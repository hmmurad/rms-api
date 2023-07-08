import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from "./auth.model";
import { Marks } from "src/marks/marks.entity";
import { Subject } from "src/subject/subject.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string

    @Column()
    fullname: string

    @Column({ type: 'enum', enum: Role, default: Role.TEACHER })
    role: Role

    @OneToMany(() => Marks, (marks) => marks.user)
    marks: Marks[]

    @OneToMany(() => Subject, (s) => s.user, {
        eager: true
    })
    subjects: Subject[]


    @BeforeInsert()
    async hash() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt)
    }
}