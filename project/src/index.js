import express from "express";
const app = express();
import { connection }  from "./storages/db.js";

import 'dotenv/config'
const {PORT} = process.env;

connection()


import userRouter from './routers/users-router.js'
import todoRouter from './routers/todo-router.js'
import authRouter from './routers/auth-router.js';



//middleware

app.use(express.json())
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/todos', todoRouter)


app.listen(PORT,()=> {
    console.log(`Server started at port ${PORT}`)
})