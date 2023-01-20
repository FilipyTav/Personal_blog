import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

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

const user_detail = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
    try {
        const { user_id } = req.params;

        const result = await User.findById(user_id);

        return res.status(200).json(result);
    } catch (err: any) {
        if (err instanceof mongoose.Error.CastError)
            return res.status(404).json({ success: false, err });

        return res.status(400).json({
            success: false,
            err,
        });
    }
};

export { index, user_detail };
