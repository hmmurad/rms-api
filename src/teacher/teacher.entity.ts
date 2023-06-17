import { Subject } from 'src/subject/subject.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teachers')
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    doj: Date

    @Column()
    fullname: string;

    @Column()
    email: string;

    @Column()
    mobile: string;

    @Column()
    address: string;

    @Column()
    gender: string;

    @OneToMany(() => Subject, (s) => s.teacher, {
        eager: true
    })
    subjects: Subject[]


}
