import { NextFunction, Request, Response } from "express"

const asyncErrorHandler = (func) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(err => next(err))
  }
}

export default asyncErrorHandler