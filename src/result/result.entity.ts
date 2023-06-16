import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('results')

export class Result {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    resultname: string

    @Column()
    createdAt: Date

    @Column()
    publishdate: Date
    @Column()
    status: string

}