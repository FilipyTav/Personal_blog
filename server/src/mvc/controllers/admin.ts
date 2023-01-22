import { Request, Response, NextFunction } from "express";
import {
    body,
    Result,
    ValidationError,
    validationResult,
} from "express-validator";
import mongoose from "mongoose";
import async from "async";

import Post from "../models/Post";
import Comment from "../models/Comment";

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

const create_post = [
    // Validates the input
    body("title", "Title must not be empty").trim().isLength({ min: 1 }),
    body("content", "Content must not be empty").trim().isLength({ min: 1 }),
    body("published").isBoolean(),

    async (req: Request, res: Response, next: NextFunction) => {
        const errors: Result<ValidationError> = validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const { title, content, published } = req.body;

        const new_post = new Post({
            title,
            content,
            published,
            comments: [],
        });

        try {
            await new_post.save();

            res.status(201).json({
                success: true,
                msg: "New post created successfully!",
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                err,
            });
        }
    },
];

const update_post = [
    body("title", "Title must not be empty").trim().isLength({ min: 1 }),
    body("content", "Content must not be empty").trim().isLength({ min: 1 }),
    body("published").isBoolean(),

    async (req: Request, res: Response, next: NextFunction) => {
        const errors: Result<ValidationError> = validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const { post_id } = req.params;
        const { title, content, published } = req.body;

        const new_post = {
            title,
            content,
            published,
        };

        try {
            await Post.findByIdAndUpdate(post_id, new_post);

            res.status(200).json({
                success: true,
                msg: "post updated successfully!",
            });
        } catch (err) {
            if (err instanceof mongoose.Error.CastError)
                return res.status(404).json({ success: false, err });

            res.status(400).json({
                success: false,
                err,
            });
        }
    },
];
const delete_post = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { post_id } = req.params;

        const result = await Post.findById(post_id);

        if (result?.comments.length)
            await Comment.deleteMany({ _id: result?.comments });

        await result?.remove();

        res.status(200).json({
            success: true,
            msg: "Post was deleted successfully",
        });
    } catch (err) {
        if (err instanceof mongoose.Error.CastError)
            return res.status(404).json({ success: false, err });

        res.status(400).json({
            success: false,
            err,
        });
    }
};

export { index, get_post, create_post, update_post, delete_post };
