import { Department } from 'src/department/department.entity';
import { Student } from 'src/student/student.entity';
import { Subject } from 'src/subject/subject.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('class')
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column()
    classname: string;

    @Column()
    departmentId: number;


    @ManyToOne(() => Department, (dept) => dept.classes)
    department: Department

    @ManyToOne(() => Subject, (sub) => sub.class)
    subjects: Subject[]

    @OneToMany( () => Student, (student) => student.class)
    student: Student
}
