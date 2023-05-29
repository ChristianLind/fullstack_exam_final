export class ProblemEntity {
    id?: number;
    file?: string;

    constructor(public subject: string, public description: string, public photo: any) {
    }
}