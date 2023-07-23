import { Department } from 'src/department/department.entity';
import { Marks } from 'src/marks/marks.entity';
import { Student } from 'src/student/student.entity';
import { Subject } from 'src/subject/subject.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('class')
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column()
    classname: string;

    @Column()
    departmentId: string;

    @OneToMany(() => Marks, (marks) => marks.class)
    marks: Marks[]

    @OneToMany(() => Subject, (sub) => sub.class, {
        eager: true
    })
    subjects: Subject[]

    @OneToMany(() => Student, (s) => s.class)
    students: Student[]

    @ManyToOne(() => Department, (dept) => dept.classes)
    department: Department




}
