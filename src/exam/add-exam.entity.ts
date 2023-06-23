
import { Session } from 'src/session/add-session.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
