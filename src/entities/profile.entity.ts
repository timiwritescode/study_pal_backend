import { BeforeInsert, Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from 'uuid';
import { User } from "./user.entity";

@Entity()
export class Profile{
    @PrimaryColumn()
    profileId: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({default: ''})
    othername: string;

    @Column()
    date_of_birth: string

    @Column()
    nationality: string;

    @Column()
    institution: string;

    @Column()
    course_of_study: string;

    @Column({type: 'text'})
    bio: string;

    @Column({default: ''})
    profile_picture_url: string

    // relations
    @OneToOne(() => User, user => user.profile)
    user: User;

    @BeforeInsert()
    addProfileId() {
        this.profileId = uuidV4()
    }
}