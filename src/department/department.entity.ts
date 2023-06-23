import { Class } from 'src/add-class/add-class.entity';
import { Student } from 'src/student/student.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('departments')
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column()
    departmentname: string;

    @OneToMany(() => Class, (c) => c.department)
    classes: Class[]

    @OneToMany(() => Student, (s) => s.department, {
        eager: true
    })
    students: Student[]
}
