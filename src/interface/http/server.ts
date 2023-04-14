import 'reflect-metadata'
import '../../config/container'
import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'

import routes  from './routes';
import AppError from '../../infra/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});


app.listen(3333, () => {
  console.log('Server listening on port 3000');
});
