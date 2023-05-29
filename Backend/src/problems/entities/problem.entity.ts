import { Tenant } from "src/Entities/tenant";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

@Entity()
export class Problem {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    subject: string

    @Column()
    description: string;

    @Column({nullable:true})
    imageUrl: string;


    @ManyToOne(() => Tenant, (tenant) => tenant.problem)
    tenant: Tenant
}