import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Task} from "./Task";
import DateTime from "../model/DateTime";

@Entity()
export class TaskStates {
    @PrimaryGeneratedColumn()
    id: number


    @ManyToOne(() => Task,task => task.taskStates,{onDelete:"SET NULL"})
    task: Task

    @Column()
    startedAt: string

    @Column({nullable:true})
    stoppedAt: string
}