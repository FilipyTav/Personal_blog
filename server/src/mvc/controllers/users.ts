import { Request, Response, NextFunction } from "express";

const index = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        msg: "Got all users",
    });
};

export { index };
