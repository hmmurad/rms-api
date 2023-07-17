import * as bcrypt from 'bcrypt';
import { Marks } from "src/marks/marks.entity";
import { Subject } from "src/subject/subject.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "./user.roles";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({ select: false })
    password: string

    @Column()
    fullname: string

    @Column({ type: 'enum', enum: UserRoles, default: UserRoles.Teacher })
    roles: UserRoles

    @OneToMany(() => Marks, (marks) => marks.user)
    marks: Marks[]

    @OneToMany(() => Subject, (s) => s.user, {
        eager: true,
    })
    subjects: Subject[]


    @BeforeInsert()
    async hash() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt)
    }
}