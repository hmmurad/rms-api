import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('marks')

export class Marks {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    studentId: number

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


}