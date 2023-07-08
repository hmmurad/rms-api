
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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




}
