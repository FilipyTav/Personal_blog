import { Router } from "express";

import * as admin_controller from "../mvc/controllers/admin";

const router: Router = Router();

router.get("/posts", admin_controller.index);

router.get("/posts/:post_id", admin_controller.get_post);

router.post("/posts", admin_controller.create_post);

router.put("/posts/:post_id", admin_controller.update_post);

router.delete("/posts/:post_id", admin_controller.delete_post);

export default router;
