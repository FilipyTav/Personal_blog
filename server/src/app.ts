import express, { Application } from "express";

import path from "path";

import index_router from "./routes/index";

const app: Application = express();

// Allows access to form content
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Parses json
app.use(express.json());

const port: Number = 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Setup static directory
app.use(express.static(path.join(__dirname, "/../dist")));

app.use("/", index_router);
