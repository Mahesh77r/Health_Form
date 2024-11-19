import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";


interface ILifestyleHabits extends Document {
  user?: string,
  confidenceInErection?: string;
  smokeTobacco?: string;
  smokeTobaccoFrequency?: string;
  consumeAlcohol?: string;
  alcoholFrequency?: string;
  physicalActivity?: string;
  physicalActivityDetails?: string;
  averageSleepHours?: number;
}


const questionnaireSchema: Schema<ILifestyleHabits> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

  confidenceInErection: {
    type: String,
    enum: ["very-low", "low", "moderate", "high", "very-high"],
  },

  smokeTobacco: {
    type: String,
    enum: ["yes", "no"],
  },
  smokeTobaccoFrequency: {
    type: String,
  },
  consumeAlcohol: {
    type: String,
    enum: ["yes", "no"],
  },
  alcoholFrequency: {
    type: String,
  },

  physicalActivity: {
    type: String,
    enum: ["yes", "no"],
  },
  physicalActivityDetails: {
    type: String,
  },
  averageSleepHours: {
    type: Number,
  },
});


const Lifestylehabits: Model<ILifestyleHabits> = mongoose.model<ILifestyleHabits>(
  "lifestylehabits",
  questionnaireSchema
);

export default Lifestylehabits;

