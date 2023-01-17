import mongoose, { Model, Schema } from "mongoose";

interface UserInterface {
    username: string;
    password: string;
}

const opts = {
    timestamps: true,
};

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        min: 1,
        unique: true,
        trim: true,
    },
    password: { type: String, required: true, min: 1 },
});

const User: Model<UserInterface> = mongoose.model<UserInterface>(
    "User",
    UserSchema
);

export default User;
export { UserInterface };
