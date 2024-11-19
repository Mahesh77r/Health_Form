import mongoose, { Schema, Document, Model } from "mongoose";


interface IStressRelationship extends Document {
  user?:string;
  stressLevel?: number;
  significantLifeChange?: string;
  lifeChangeDetails?: string;
  relationshipWithPartner?: string;
  relationshipDetails?: string;
}


const stressRelationshipSchema: Schema<IStressRelationship> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    
  stressLevel: {
    type: Number,
    min: 1,
    max: 10,
  },
  
  significantLifeChange: {
    type: String,
    enum: ["yes", "no"],
  },
  lifeChangeDetails: {
    type: String,
  },
  
  relationshipWithPartner: {
    type: String,
  },
  relationshipDetails: {
    type: String,
  },
});

const StressRelationship: Model<IStressRelationship> = mongoose.model<IStressRelationship>(
  "StressRelationship",
  stressRelationshipSchema
);

export default StressRelationship;
