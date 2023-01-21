import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import Post from "../models/Post";

const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Post.find().populate({
            path: "comments",
            options: {
                sort: { createdAt: -1 },
            },
        });

        return res.status(200).json(result);
    } catch (err) {
        if (err instanceof mongoose.Error.CastError)
            return res.status(404).json({ success: false, err });

        return res.status(400).json({
            success: false,
            err,
        });
    }
};

const get_post = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { post_id } = req.params;

        const result = await Post.findById(post_id).populate({
            path: "comments",
            options: {
                sort: { createdAt: -1 },
            },
        });

        return res.status(200).json(result);
    } catch (err) {
        if (err instanceof mongoose.Error.CastError)
            return res.status(404).json({ success: false, err });

        return res.status(400).json({
            success: false,
            err,
        });
    }
};

const create_post = (req: Request, res: Response, next: NextFunction) => {
    res.json({ msg: "post created!" });
};

const update_post = (req: Request, res: Response, next: NextFunction) => {
    res.json({ msg: "post updated!" });
};

const delete_post = (req: Request, res: Response, next: NextFunction) => {
    res.json({ msg: "post deleted!" });
};

export { index, get_post, create_post, update_post, delete_post };
