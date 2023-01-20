import express, { NextFunction, Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.redirect("/posts");
});

export default router;
