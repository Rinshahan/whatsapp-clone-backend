import express, { Express, NextFunction, Request, Response } from "express"
import { errorHandler } from "./apis/middlewares/errorHandler"
import userAuthRoutes from "./apis/routes/userAuthRoutes"
import morgan from "morgan"
import { customError } from "./apis/utils/customError"
import otpRoutes from "./apis/routes/otpRoutes"
const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api/users', userAuthRoutes, otpRoutes)

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new customError(`can't find ${req.originalUrl} on the server`, 404)
  next(error)
})
app.use(errorHandler)
//app.use(globalErrorHandler)

export default app