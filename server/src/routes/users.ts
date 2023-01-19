import express, { NextFunction, Request, Response, Router } from "express";

import * as users_controller from "../mvc/controllers/posts";

const router: Router = express.Router();

router.get("/", users_controller.index);

export default router;
