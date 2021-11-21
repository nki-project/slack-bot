import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Task} from "./Task";

@Entity()
export class TaskStates {
    @PrimaryGeneratedColumn()
    id: number


    @ManyToOne(() => Task,task => task.taskStates,{onDelete:"SET NULL"})
    task: Task

    @Column({nullable:true})
    startedAt: string

    @Column({nullable:true})
    stoppedAt: string
}