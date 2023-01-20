import { Request, Response, NextFunction } from "express";

import User from "../models/User";

const index = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
    try {
        const result = await User.find();

        return res.status(200).json(result);
    } catch (err) {
        return res.status(400).json({
            success: false,
            err,
        });
    }
};

export { index };
