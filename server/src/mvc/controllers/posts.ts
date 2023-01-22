import { NextFunction, Request, Response } from "express";

import async from "async";
import mongoose from "mongoose";

import {
    body,
    Result,
    ValidationError,
    validationResult,
} from "express-validator";
import Comment from "../models/Comment";
import Post from "../models/Post";

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

const create_comment = [
    body("content", "Content must not be empty")
        .trim()
        .isLength({ min: 1 })
        // I still dont know when to escape user input,
        // cause if i want it to show in the browser, it show the escaped content
        .escape(),

    async (req: Request, res: Response, next: NextFunction) => {
        const errors: Result<ValidationError> = validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            const { post_id } = req.params;
            const { author, content } = req.body;

            const new_comment = new Comment({
                author,
                content,
            });

            const result: any = await async.parallel({
                comment(callback) {
                    new_comment.save(callback);
                },
                post(callback) {
                    Post.findById(post_id).exec(callback);
                },
            });

            // Adds the new comment to the post's comments
            result.post.comments.push(result.comment);
            await result.post.save();

            return res
                .status(200)
                .json({ success: true, msg: "Comment created successfully!" });
        } catch (err) {
            if (err instanceof mongoose.Error.CastError)
                return res.status(404).json({ success: false, err });

            return res.status(400).json({
                success: false,
                err,
            });
        }
    },
];

export {
    index,
    post_detail,
    post_comments,
    post_comment_detail,
    create_comment,
};
