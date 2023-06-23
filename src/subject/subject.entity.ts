import { Class } from 'src/add-class/add-class.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('subjects')
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column()
    subjectname: string;

    @Column()
    code: string;

    @Column()
    classId: number

    @Column()
    teacherId: number

    @ManyToOne(() => Class, (c) => c.subjects)
    class: Class

    @ManyToOne(() => Teacher, (t) => t.subjects)
    teacher: Teacher



}
