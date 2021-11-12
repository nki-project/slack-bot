import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Settings {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    enableQuotes: boolean

    @Column()
    user: string
}

