import express, { NextFunction, Request, Response, Router } from "express";

import * as posts_controller from "../mvc/controllers/posts";

const router: Router = express.Router();

router.get("/", posts_controller.index);

export default router;
