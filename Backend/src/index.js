import express from 'express';
import dotenv from 'dotenv';
import {clerkMiddleware} from '@clerk/express';
import fileUpload from 'express-fileupload';
import path from 'path';
import cors from 'cors';
import cron from 'node-cron';
import fs from "fs";

import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import songRoutes from './routes/songRoutes.js'
import albumRoutes from './routes/albumRoutes.js'
import statRoutes from './routes/statRoutes.js'
import { connectDB } from './lib/db.js';
import { createServer } from 'http';
import { initializeSocket } from './lib/socket.js';

dotenv.config();

const app= express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use(express.json());
app.use(clerkMiddleware());//this will add auth to request object 
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:path.join(__dirname,"tmp"),
    createParentPath:true,
    limits:{
        fileSize:10 * 1024 * 1024,//10MB max size
    }
}));

//deleting of temp files every hour
const tempDir = path.join(process.cwd(),"tmp");

cron.schedule("0 * * * *", async () => {
    try {
        fs.access(tempDir, fs.constants.F_OK, (err) => {
            if (err) return;
            fs.readdir(tempDir, (err, files) => {
                if (err) {
                    console.log("error", err);
                    return;
                }
                files.forEach(file => {
                    fs.unlink(path.join(tempDir, file), (err) => {
                        if (err) console.log("Failed to delete temp file:", file, err);
                    });
                });
            });
        });
    } catch (error) {
        console.log("Temp file cleanup error:", error);
    }
});

//chatting
const httpServer = createServer(app);
initializeSocket(httpServer);



app.use("/api/users",userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/songs',songRoutes);
app.use('/api/albums',albumRoutes);
app.use('/api/stats',statRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../frontend","dist","index.html"));
    })
}

app.use((err,req,res,next)=>{
    res.status(500).json({message:process.env.NODE_ENV === "production" ? "Internal server error" : err.message});
});


httpServer.listen(PORT,()=>{
   console.log("server is running on "+ PORT);
   connectDB();
})