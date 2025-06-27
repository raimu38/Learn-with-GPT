// backend/src/routes/todo.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// Todo の一覧取得
router.get('/', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// 新規 Todo 作成
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTodo = await prisma.todo.create({
      data: { title, description },
    });
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// 1件の Todo 取得
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todo.findUnique({
      where: { id },
    });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

// Todo 更新
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { title, description, completed },
    });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// Todo 削除
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await prisma.todo.delete({
      where: { id },
    });
    res.json(deletedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

export default router;

