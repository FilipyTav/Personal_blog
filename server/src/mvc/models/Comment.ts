import mongoose, { Model, Schema } from "mongoose";

interface CommentInterface extends Document {
    author: string;
    content: string;
}

const opts = {
    timestamps: true,
};

const CommentSchema: Schema = new Schema(
    {
        author: { type: String, required: true },
        content: { type: String, required: true },
    },
    opts
);

const Comment: Model<CommentInterface> = mongoose.model<CommentInterface>(
    "Comment",
    CommentSchema
);

export default Comment;
export { CommentInterface };
