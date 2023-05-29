import { Role } from "src/user/Role";
//mangler ticket og problem

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class BoardMember {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    phone: string;
  
    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity
}