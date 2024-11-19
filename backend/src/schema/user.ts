import mongoose, { Schema, Document, Model } from "mongoose";


interface IUser extends Document {
  age?: number;
  weight?: number;
  height?: number;
  occupation?: string;
  city?: string;
  gender?: string;
}


const userSchema: Schema<IUser> = new Schema({
  age: { type: Number },
  weight: { type: Number },
  height: { type: Number },
  occupation: { type: String },
  city: { type: String },
  gender: { type: String },
});


const Department: Model<IUser> = mongoose.model<IUser>("user", userSchema);

export default Department;


