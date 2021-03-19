
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import database from "./config/database/index.js"

const app = express();

//connect db
database()

dotenv.config()

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))

app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);




const PORT = process.env.PORT|| 5000;

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });
  
