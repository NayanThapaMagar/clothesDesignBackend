//importing files
import express from 'express';
// const express = require("express");
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors';

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

// app.get("/", (req, res) => {
//     // console.log(req);
//     res.status(234).send("app is working...")
// });

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        //server start
        app.listen(PORT, () => {
            console.log("server at ", PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });

