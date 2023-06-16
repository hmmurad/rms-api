import { Class } from 'src/add-class/add-class.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('departments')
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column()
    departmentname: string;


    @OneToMany(() => Class , (c) => c.department, {
        eager: true
    })
    classes: Class[]
}
