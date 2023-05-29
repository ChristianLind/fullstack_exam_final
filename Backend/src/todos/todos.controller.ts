import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
    constructor(private todoService: TodosService) {}

    @Get()
    async getAll(): Promise<Todo[]> {
        return await this.todoService.findAll();
    }

    @Post()
    create(@Body() todo: Todo) : Promise<Todo> {
        return this.todoService.create(todo);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.todoService.remove(+id);
    }
}