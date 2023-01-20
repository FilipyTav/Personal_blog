import { Request, Response, NextFunction } from "express";

import mongoose from "mongoose";

import Post from "../models/Post";
import Comment from "../models/Comment";

// Because
// MissingSchemaError: Schema hasn't been registered for model "Comment".
Comment;

const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Post.find();

        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({
            success: false,
            err,
        });
    }
};

const post_detail = async (req: Request, res: Response, next: NextFunction) => {
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

const post_comments = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { post_id } = req.params;

        const result = await Post.findById(post_id)
            .populate({
                path: "comments",
                options: {
                    sort: { createdAt: -1 },
                },
            })
            .select("comments -_id");

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

const post_comment_detail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { post_id, comment_id } = req.params;

        const result = await Comment.findById(comment_id);

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

export { index, post_detail, post_comments, post_comment_detail };
