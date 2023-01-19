import express, { Application } from "express";

import path from "path";
import dotenv from "dotenv";

import index_router from "./routes/index";
import posts_router from "./routes/posts";
import users_router from "./routes/users";

dotenv.config();

const app: Application = express();

// Allows access to form content
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Parses json
app.use(express.json());

const port: Number = Number(process.env.PORT) || 6000;

app.listen(port, () => {
    console.log(`⚡ Server running at http://localhost:${port}`);
});

// Setup static directory
app.use(express.static(path.join(__dirname, "/../dist")));

app.use("/", index_router);
app.use("/posts", posts_router);
app.use("/users", users_router);
