
import { Exam } from 'src/exam/add-exam.entity';
import { Student } from 'src/student/student.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('session')
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    year: string

    @OneToMany(() => Student, (std) => std.session, {
        eager: true
    })
    students: Student[]

    @OneToMany(() => Exam, (ex) => ex.session, {
        eager: true
    })
    exams: Exam[]
}
