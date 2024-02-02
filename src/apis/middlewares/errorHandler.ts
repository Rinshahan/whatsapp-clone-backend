import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (error: { statusCode: number; status: string; message: any; }, req: Request, res: Response, next: NextFunction) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error"
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message
  })
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}

export {globalErrorHandler,errorHandler} 