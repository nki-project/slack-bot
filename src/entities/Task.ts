import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

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

    @Column({nullable:true})
    startedAt: Date

    @Column({nullable:true})
    stoppedAt: Date

    @CreateDateColumn()
    createdAt: Date
}