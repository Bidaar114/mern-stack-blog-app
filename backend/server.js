import express, { json } from 'express'
import connectDb from './config/db.js';
import { port } from './config/config.js';
import chalk from 'chalk';
import userRouter from './routes/userRouter.js';
import cookieParser from 'cookie-parser';
import postRouter from './routes/postRouter.js';


const app = express();

app.use(express.json());
app.use(cookieParser());


 app.use('/api/user', userRouter);
 
app.use('/api/post', postRouter);

connectDb();
app.listen(port, () => {
    console.log(`${chalk.yellow.bold('server')} litening on ${port}`);
})