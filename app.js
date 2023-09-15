import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"

import cookieParser from "cookie-parser";
import {config} from "dotenv"
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"
export const app = express();
config({
    path:"./data/config.env"
})
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    method: ["GET","POST","PUT","DELETE"],
    credentials:true
    
}))
app.use("/api/v1/user",userRouter)
app.use("/api/v1/task",taskRouter)

app.get("/", (req, res) => {
    res.send("Nice Working")
})

app.use(errorMiddleware)