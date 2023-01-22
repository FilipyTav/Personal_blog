import express, { Router } from "express";

import * as posts_controller from "../mvc/controllers/posts";

const router: Router = express.Router();

router.get("/", posts_controller.index);

router.get("/:post_id", posts_controller.post_detail);

router.get("/:post_id/comments", posts_controller.post_comments);

router.post("/:post_id/comments", posts_controller.create_comment);

router.get(
    "/:post_id/comments/:comment_id",
    posts_controller.post_comment_detail
);

export default router;
