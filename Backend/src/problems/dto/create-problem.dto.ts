import { Tenant } from "src/Entities/tenant"

export class CreateProblemDto {
    tenant: Tenant

    constructor(public subject: string, public description: string, public imageUrl?: string) {}
}