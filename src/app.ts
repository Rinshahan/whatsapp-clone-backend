import express, { Express, NextFunction, Request, Response } from "express"
import { globalErrorHandler } from "./apis/middlewares/errorHandler"

const app: Express = express()


app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new customError(`can't find ${req.originalUrl} on the server`, 404)
  next(error)
})

app.use(globalErrorHandler)

export default app