import mongoose, { Model, Schema } from "mongoose";

interface PostInterface extends Document {
    title: string;
    content: string;
    published: boolean;
}

const opts = {
    timestamps: true,
};

const PostSchema: Schema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true },
        published: { type: Boolean, required: true, default: true },
    },
    opts
);

const Post: Model<PostInterface> = mongoose.model<PostInterface>(
    "Post",
    PostSchema
);

export default Post;
export { PostInterface };
