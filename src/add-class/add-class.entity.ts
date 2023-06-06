import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('class')
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    classname: string;
}
