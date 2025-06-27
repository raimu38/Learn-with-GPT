import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import todoRouter from './routes/todo';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Todo App API is running.');
});

app.use('/todos', todoRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
