import { Class } from "src/add-class/add-class.entity";
import { User } from "src/auth/auth.entity";
import { Exam } from "src/exam/add-exam.entity";
import { Student } from "src/student/student.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('marks')

export class Marks {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    studentId: number

    @Column()
    userId: number

    @Column()
    subjectId: number

    @Column()
    examId: number

    @Column()
    classId: number

    @Column()
    attendance: number

    @Column()
    assignment: number

    @Column()
    tutorial: number

    @Column()
    written: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @ManyToOne(() => Student, (std) => std.marks, {
        eager: true
    })
    student: Student


    @ManyToOne(() => Class, (c) => c.marks, {
        eager: true
    })
    class: Class
    @ManyToOne(() => Exam, (exam) => exam.marks, {
        eager: true
    })
    exam: Exam
    @ManyToOne(() => User, (user) => user.marks)
    user: User


}