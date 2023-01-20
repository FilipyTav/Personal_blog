import mongoose, { Model, Schema } from "mongoose";

import { CommentInterface } from "./Comment";

interface PostInterface extends Document {
    title: string;
    content: string;
    published: boolean;
    comments: CommentInterface[];
}

const opts = {
    timestamps: true,
};

const PostSchema: Schema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true },
        published: { type: Boolean, required: true, default: false },
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    },
    opts
);

const Post: Model<PostInterface> = mongoose.model<PostInterface>(
    "Post",
    PostSchema
);

export default Post;
export { PostInterface };
