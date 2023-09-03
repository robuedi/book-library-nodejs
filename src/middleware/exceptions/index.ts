import { NextFunction, Request, Response } from 'express';

function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  const status: number = 500;
  const message: string = error.message || 'Something went wrong';

  res.status(status).json({ message });
}

export default errorMiddleware;