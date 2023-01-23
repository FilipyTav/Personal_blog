import express, { Router } from "express";

import * as users_controller from "../mvc/controllers/users";

const router: Router = express.Router();

router.get("/", users_controller.index);

router.post("/login", users_controller.login);

router.get("/:user_id", users_controller.user_detail);

export default router;
