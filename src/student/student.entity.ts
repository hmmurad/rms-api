import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('students')
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column()
    fullname: string;

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
}
