import { UUID } from "crypto";
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidV4} from 'uuid'
import { Profile } from "./profile.entity";

@Entity()
export class User {
    @PrimaryColumn()
    user_id: UUID

    @Column({type: 'varchar'})
    username: string;
    
    @Column({type: 'varchar', unique: true})
    email: string;

    @Column()
    passwordHash: string

    @Column({default: 'USER'})
    role: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date


    // relationships
    @OneToOne(() => Profile, profile => profile.user)
    profile: Profile
    @BeforeInsert()
    addId() {
        this.user_id = uuidV4()
    }
}