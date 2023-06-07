import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('class')
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column()
    classname: string;
}
