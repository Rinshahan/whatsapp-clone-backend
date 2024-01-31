import express, { Express, NextFunction, Request, Response } from "express"
import { globalErrorHandler } from "./apis/middlewares/errorHandler"
import userAuthRoutes from "./apis/routes/userAuthRoutes"

const app: Express = express()

app.use(express.json())
app.use('/api/users', userAuthRoutes)

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new customError(`can't find ${req.originalUrl} on the server`, 404)
  next(error)
})

app.use(globalErrorHandler)

export default app