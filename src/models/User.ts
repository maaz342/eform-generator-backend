import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
      _id: Types.ObjectId;   
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  gender?: string;
  nationality?: string;
  dateOfBirth?: Date;
  picture?: string;
  isAdmin: boolean;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    gender: String,
    nationality: String,
    dateOfBirth: Date,
    picture: String,
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
