import mongoose, { Model, Schema } from "mongoose";

interface CommentInterface extends Document {
    username: string;
    content: string;
}

const opts = {
    timestamps: true,
};

const CommentSchema: Schema = new Schema(
    {
        username: { type: String, required: true },
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
