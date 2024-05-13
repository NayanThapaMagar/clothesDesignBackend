//importing files
import express from 'express';
// const express = require("express");
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors';
import logger from './logger/index.js'

// requiring routers
import { router } from './src/routes/index.js';
// const router = require("./src/routes/index");

// const authrouter = require("./src/routes/auth");

//setting up our app
const app = express();

//setting up cors
app.use(cors());
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//         credentials: true,
//     })
// );

// create application/json parser
app.use(express.json());

// //route configure
app.use("/", router);
// app.use("/auth", authrouter);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        // logger.info('App connected to database');
        logger.log('info', 'App connected to database');
        //server start
        app.listen(PORT, () => {
            logger.info(`server at ${PORT}`);
            // logger.log('info', `server at ${PORT}`)
        });
    })
    .catch((error) => {
        logger.log('error', error);
    });

