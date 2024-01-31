import express, { json } from 'express'
import connectDb from './config/db.js';
import chalk from 'chalk';
import userRouter from './routes/userRouter.js';
import cookieParser from 'cookie-parser';
import postRouter from './routes/postRouter.js';
//const cors = require('cors');
  import cors from 'cors';


const app = express();
const PORT = 8000



app.use(cors());

app.use(cors({
  origin: ['https://mern-stack-blog-app-api.vercel.app'],
  methods: ["POST", "GET", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


 app.use('/api/user', userRouter);
 
app.use('/api/post', postRouter);

connectDb();
app.listen(PORT, () => {
    console.log(`${chalk.yellow.bold('server')} litening on ${PORT}`);
})


//module.exports = app;