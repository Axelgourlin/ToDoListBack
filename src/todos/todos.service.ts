import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoInput: CreateTodoInput): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoInput);
    return await this.todoRepository.save(todo);
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: string): Promise<Todo> {
    const todo = this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    return todo;
  }

  async update(id: string, updateTodoInput: UpdateTodoInput): Promise<Todo> {
    const todo = await this.todoRepository.preload({
      id: id,
      ...updateTodoInput,
    });
    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    return await this.todoRepository.save(todo);
  }

  async remove(id: string): Promise<Todo> {
    const todo = await this.findOne(id);
    await this.todoRepository.remove(todo);
    return { id: id, text: '', createdAt: '', status: '' };
  }
}
