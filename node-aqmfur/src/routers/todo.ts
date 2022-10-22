import express, { Request, Response } from 'express';

import { AppError } from '../middlewares/errors';
import Todo from '../models/Todo';
import TodoService, { TodoRequest } from '../services/TodoService';
import { asyncHandler, fullNameConcat } from '../util/Utils';

export const router = express.Router();
export const pathName = '/todo';

router.get(
  '/todo',
  asyncHandler(async (req, res) => {
    const localTodos: Todo[] = await TodoService.findAll();
    res.json(localTodos);
  })
);

router.put(
  '/todo/:id',
  asyncHandler(async (req, res) => {
    const todo = await TodoService.update(
      req.params.id as string,
      req.body as TodoRequest
    );
    res.json(todo);
  })
);

router.get(
  '/todo/:id',
  asyncHandler(async (req, res) => {
    const todo = await TodoService.findById(req.params.id as string);
    res.json(todo);
  })
);

interface ITodo {
  message: string;
  name: string;
}

router.post(
  '/todo',
  asyncHandler(async (req, res) => {
    const todo = await TodoService.create(req.body as TodoRequest);
    res.json(todo);
  })
);

router.post('/full-name', (req: Request, res: Response) => {
  const body = req.body;
  if (body.firstName !== 'Anderson') {
    throw new AppError({
      customMessage: 'Name not registered',
      status: 401,
    });
  }
  res.json({ name: fullNameConcat(body.firstName, body.lastName) });
});

export default router;
