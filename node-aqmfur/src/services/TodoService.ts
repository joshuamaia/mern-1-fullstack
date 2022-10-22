import bcrypt from 'bcrypt';

import { AppError } from '../middlewares/errors';
import Todo from '../models/Todo';
import User from '../models/User';

export interface TodoRequest {
  title: string;
  message: string;
  active?: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

class TodoService {
  async findById(id?: string | number | undefined): Promise<Todo> {
    if (!id) {
      throw new AppError({ customMessage: 'Id required', status: 404 });
    }
    const todo = await Todo.findOne({ where: { id } });
    if (!todo) {
      throw new AppError({ customMessage: 'Todo not found', status: 404 });
    }
    return todo;
  }

  async deleteById(id?: string | number | undefined): Promise<Todo> {
    if (!id) {
      throw new AppError({ customMessage: 'Id required', status: 404 });
    }
    const todo = await Todo.findOne({ where: { id } });
    if (!todo) {
      throw new AppError({ customMessage: 'Todo not found', status: 404 });
    }
    Todo.destroy({ where: { id } });
    return todo;
  }

  findAll(): Promise<Todo[]> {
    return Todo.findAll({
      attributes: {
        exclude: ['active'],
      },
    });
  }

  async update(id: number | string, todoRequest: TodoRequest): Promise<Todo> {
    const todo = await this.findById(id);
    return todo.update(todoRequest);
  }

  async create(todoRequest: TodoRequest): Promise<Todo> {
    console.log(todoRequest);
    return Todo.create({
      ...todoRequest,
      active: true,
    });
  }
}

export default new TodoService();
