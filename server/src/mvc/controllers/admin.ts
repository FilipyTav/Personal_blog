import { Request, Response, NextFunction } from "express";

const index = (req: Request, res: Response, next: NextFunction) => {
    res.json({ msg: "Here are all the posts" });
};

const get_post = (req: Request, res: Response, next: NextFunction) => {
    res.json({ msg: "Here is a specific post" });
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
