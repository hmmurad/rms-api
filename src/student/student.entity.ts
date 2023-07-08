
import { Class } from 'src/add-class/add-class.entity';
import { Department } from 'src/department/department.entity';
import { Marks } from 'src/marks/marks.entity';
import { Session } from 'src/session/add-session.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('students')
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column()
    fullname: string;

    @Column()
    roll: number;

    @Column()
    email: string;

    @Column()
    dob: string;

    @Column()
    mobile: string;

    @Column()
    status: string;

    @Column()
    address: string;

    @Column()
    gender: string;

    @Column()
    departmentId: number;

    @Column()
    classId: number;

    @Column()
    sessionId: number

    @ManyToOne(() => Session, (s) => s.students)
    session: Session

    @ManyToOne(() => Class, (c) => c.students, {
        eager: true
    })
    class: Class
    @ManyToOne(() => Department, (d) => d.students)
    department: Department
    @OneToMany(() => Marks, (marks) => marks.student)
    marks: Marks[]


}
