import { Role } from "src/user/Role";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Tenant } from "./tenant";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    // @Column()
    // email: string

    @Column()
    username: string

    @Column()
    password: string

    // @Column()
    // fName: string

    // @Column()
    // lName: string

    // @Column()
    // DOB: string

    // @Column()
    // pNumber: string

    // @Column()
    // address: string

    //hvis man fraflytter, fjernes "tenant" rollen og derved mistes rollen fra linje 36 også
    //one to one siger i dette tilfælde at man skal endten være tenant eller ingenting
    @OneToOne(type => Tenant, tenant => tenant.user)
	tenant: Tenant | null

    //Man skal have en rolle
    @Column({
        type:"enum", 
        enum: Role, 
        default: [Role.User]
    })
    role: Role;
    validPassword: boolean;
}