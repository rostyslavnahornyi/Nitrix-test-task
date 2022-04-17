import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

import taskRouter from './routes/tasks.js';

const app = express();
const PORT = process.env.PORT ?? 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/app', taskRouter);

mongoose
    .connect(MONGO_URI)
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))
    )
    .catch((error) => console.log(error));
