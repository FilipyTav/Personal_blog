import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
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

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    try {
        const [result] = await User.find({ username });

        const is_pw_correct = await bcrypt.compare(password, result.password);

        const opts = {} as { expiresIn: number };

        if (is_pw_correct) {
            // token expires in 20min
            opts.expiresIn = 1200;
            const secret = process.env.JWT_SECRET || "";
            const token = jwt.sign({ username }, secret, opts);

            return res.status(200).json({
                message: "Logged in successfully",
                token,
            });
        }
    } catch (err) {
        if (err instanceof mongoose.Error.CastError)
            return res.status(404).json({ success: false, err });
    }

    return res.status(401).json({ message: "Auth Failed" });
};
export { index, user_detail, login };
