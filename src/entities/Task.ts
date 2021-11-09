import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TaskStates} from "./TaskStates";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({nullable:true})
    userId: string

    @Column({nullable:true})
    channelId: string

    @Column({nullable:true,default:false})
    isStarted: boolean

    @Column({nullable:false,default:false})
    isStopped: boolean

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(() => TaskStates, taskState => taskState.task)
    taskStates : Task[]
}