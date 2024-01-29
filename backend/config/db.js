import mongoose from 'mongoose';
import { mongoDb } from './config.js';
import chalk from 'chalk';


const connectDb = async () => {

    try{

        await mongoose.connect(mongoDb);

        console.log(`connected to the ${chalk.yellow.bold('Database:')} ${mongoDb}`);

    }catch(err){
        console.log(`Error connecting to the ${chalk.yellow.bold('database')} ${err}`);
        process.exit(1);
    }
}

export default connectDb
