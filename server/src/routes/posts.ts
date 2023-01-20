import express, { Router } from "express";

import * as posts_controller from "../mvc/controllers/posts";

const router: Router = express.Router();

router.get("/", posts_controller.index);

router.get("/:post_id", posts_controller.post_detail);

export default router;
