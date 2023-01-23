import express, { Application } from "express";

import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";
import passport from "passport";
import path from "path";
import jwt_strategy from "./strategies/jwt";

import admin_router from "./routes/admin";
import index_router from "./routes/index";
import posts_router from "./routes/posts";
import users_router from "./routes/users";

passport.use(jwt_strategy);

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

app.use(
    cors({
        origin: `http://localhost:${port}`,
        credentials: true,
    })
);

app.listen(port, () => {
    console.log(`⚡ Server running at http://localhost:${port}`);
});

// Setup static directory
app.use(express.static(path.join(__dirname, "/../dist")));

app.use("/", index_router);
app.use("/posts", posts_router);
app.use("/users", users_router);

// The admin router now requires authentication
app.use(
    "/admin",
    passport.authenticate("jwt", { session: false }),
    admin_router
);
