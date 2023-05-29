import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class ProblemsService {
    constructor(@InjectRepository(Problem) 
    private problemRepository: Repository<Problem>,
    private readonly httpService: HttpService) {}


    async saveImage(base64EncodedImage: string): Promise<string> {
        const formData = new FormData();
        formData.append('image', base64EncodedImage);
        const { data: imageData } = await firstValueFrom(
            this.httpService
            .post(
                `https://freeimage.host/api/1/upload?key=${process.env.IMG_API_KEY}`,
                formData,
            )
            .pipe(
                catchError((error: AxiosError) => {
                console.log("error!!!!!");
                throw error;
                }),
            ),
        );
        return imageData.image.display_url;
    }

    create(createProblemDto: CreateProblemDto) {
        return this.problemRepository.save(createProblemDto)
    }

    findAll() {
        return this.problemRepository.find();
    }

    findOne(id: number) {
        return this.problemRepository.findOneBy({id: id})
    }

    // update(id: number, updateProblemDto: UpdateProblemDto) {
    //   return `This action updates a #${id} problem`;
    // }

    remove(id: number) {
        return this.problemRepository.delete(id);
    }
}