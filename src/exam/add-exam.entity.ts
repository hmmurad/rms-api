
import { Marks } from 'src/marks/marks.entity';
import { Session } from 'src/session/add-session.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exam')
export class Exam {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    examname: string

    @Column()
    sessionId: number

    @ManyToOne(() => Session, (s) => s.exams)
    session: Session

    @OneToMany(() => Marks, (marks) => marks.exam)
    marks: Marks[]
}
