import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (error: { statusCode: number; status: string; message: any; }, req: Request, res: Response, next: NextFunction) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error"
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message
  })
}

export {globalErrorHandler} 