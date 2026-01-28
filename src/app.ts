
import express, { Request, Response } from "express"

import cors from "cors"

import { router } from "./app/routes"
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler"
import notFound from "./app/middlewares/notFound"
import cookieParser from "cookie-parser"



import { envVars } from "./app/config/env"

const app = express()



app.use(cookieParser()) 
app.use(express.json())
app.set("trust proxy", 1) 
app.use(express.urlencoded({ extended: true })) 

// 
app.use(cors({
    origin : envVars.FRONTEND_URL,
    credentials : true 

}))

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome To Task Tracker"
    })
})

app.use("/api/v1", router)


app.use(globalErrorHandler)


app.use(notFound)



export default app