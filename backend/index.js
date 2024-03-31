import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});