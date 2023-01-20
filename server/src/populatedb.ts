#! /usr/bin/env node

console.log(
    "This script populates some test items to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

type PostType = {
    title: string;
    content: string;
    published: boolean;
    comments: CommentInterface[];
};

type CommentType = {
    author: UserInterface | string;
    content: string;
};

type UserType = {
    username: string;
    password: string;
};

import async from "async";
// import bcrypt from "bcryptjs";

import Post, { PostInterface } from "./mvc/models/Post";
import Comment, { CommentInterface } from "./mvc/models/Comment";
import User, { UserInterface } from "./mvc/models/User";

import mongoose from "mongoose";
const mongoDB = userArgs[0];

mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Deletes all the current data in database, if necessary
const drop_collections = async () => {
    try {
        await User.collection?.drop();
        await Post.collection?.drop();
        await Comment.collection?.drop();
    } catch (err) {
        console.log(err);
    }
};

drop_collections();

const users: UserInterface[] = [];
const comments: CommentInterface[] = [];
const posts: PostInterface[] = [];

async function UserCreate({
    username,
    password,
    cb,
}: {
    username: string;
    password: string;
    cb: Function;
}) {
    // const hashed_password = await bcrypt.hash(password, 12);

    const user_detail: UserType = {
        username,
        password,
    };

    console.log(user_detail);

    const user = new User(user_detail);

    try {
        await user.save();

        console.log("New User: " + user);
        users.push(user);
        cb(null, user);
    } catch (err) {
        cb(err, null);
        console.log(err);
    }
}

async function CommentCreate(
    author: UserInterface | string,
    content: string,
    cb: Function
) {
    const comment_detail: CommentType = {
        author,
        content,
    };

    const comment = new Comment(comment_detail);

    try {
        await comment.save();

        console.log("New Comment: " + comment);
        comments.push(comment);
        cb(null, comment);
    } catch (err) {
        cb(err, null);
        console.log(err);
    }
}

async function PostCreate(
    title: string,
    content: string,
    published: boolean,
    comments: CommentInterface[],
    cb: Function
) {
    const post_detail: PostType = {
        title,
        content,
        published,
        comments: [],
    };

    if (comments.length) post_detail.comments = comments;

    const post = new Post(post_detail);

    try {
        await post.save();

        console.log("New Post: " + post);
        posts.push(post);
        cb(null, post);
    } catch (err) {
        cb(err, null);
        console.log(err);
    }
}

const createUsers = async (
    cb: async.AsyncResultArrayCallback<unknown, Error> | undefined
) => {
    try {
        let results = await async.parallel(
            [
                function (callback: Function) {
                    UserCreate({
                        username: "Fake",
                        password: "pw",
                        cb: callback,
                    });
                },
            ],
            // This callback is not optional at all
            // without it async.series does not work
            cb
        );
    } catch (err) {
        console.log(err);
    }
};

const createComments = async (
    cb: async.AsyncResultArrayCallback<unknown, Error> | undefined
) => {
    try {
        const result = await async.parallel(
            [
                function (callback: Function) {
                    CommentCreate("Random name", "first message", callback);
                },
                function (callback: Function) {
                    CommentCreate("Anon", "second message", callback);
                },
                function (callback: Function) {
                    CommentCreate(
                        "RD",
                        "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
                        callback
                    );
                },
                function (callback: Function) {
                    CommentCreate("FS", "lorem10", callback);
                },
                function (callback: Function) {
                    CommentCreate("TS", "lorem ipsum or smt", callback);
                },
            ],
            cb
        );
    } catch (err) {
        console.log(err);
    }
};

const createPosts = async (
    cb: async.AsyncResultArrayCallback<unknown, Error> | undefined
) => {
    try {
        let results = await async.parallel(
            [
                function (callback: Function) {
                    PostCreate(
                        "Why autumn is the best season",
                        "It just is",
                        true,
                        [comments[1], comments[2], comments[3], comments[4]],
                        callback
                    );
                },
                function (callback: Function) {
                    PostCreate(
                        "Water is the best drink",
                        "It is tho",
                        false,
                        [comments[0]],
                        callback
                    );
                },
            ],
            cb
        );
    } catch (err) {
        console.log(err);
    }
};

const init = async () => {
    try {
        const results = await async.series([
            createUsers,
            createPosts,
            createComments,
        ]);

        console.log("Users: " + users);

        // All done, disconnect from database
        mongoose.connection.close();
    } catch (err) {
        console.log("FINAL ERR: " + err);
    }
};

init();
