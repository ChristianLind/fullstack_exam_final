import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
    constructor(@InjectRepository(Todo) private todoRepository: Repository<Todo>) {}

    create(todo: Todo) {
        return this.todoRepository.save(todo)
    }

    findAll() {
        return this.todoRepository.find();
    }

    findOne(id: number) {
        return this.todoRepository.findOneBy({id: id})
    }

    remove(id: number) {
        return this.todoRepository.delete(id);
    }
}