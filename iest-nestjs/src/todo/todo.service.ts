import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(todo: Todo) {
    return this.todoRepository.save(todo);
  }

  async findOneById(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    return todo;
  }

  async removeById(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    const user = await this.todoRepository.remove(todo);
    return user;
  }

  async findAll() {
    return this.todoRepository.find();
  }

  async update(id: number, todo: Todo) {
    return this.todoRepository.update(id, todo);
  }
}
