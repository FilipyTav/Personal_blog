import express, { Application } from "express";

import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

import index_router from "./routes/index";
import posts_router from "./routes/posts";
import users_router from "./routes/users";
import admin_router from "./routes/admin";

dotenv.config();

const mongoDB = process.env.MONGODB_CONNECTION || "";
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app: Application = express();

// Allows access to form content
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Parses json
app.use(express.json());

const port: Number = Number(process.env.PORT) || 6001;

app.listen(port, () => {
    console.log(`⚡ Server running at http://localhost:${port}`);
});

// Setup static directory
app.use(express.static(path.join(__dirname, "/../dist")));

app.use("/", index_router);
app.use("/posts", posts_router);
app.use("/users", users_router);
app.use("/admin", admin_router);
