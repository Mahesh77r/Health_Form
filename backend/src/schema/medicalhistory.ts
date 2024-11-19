import mongoose, { Schema, Document, Model } from "mongoose";


interface IMedicalHistory extends Document {
  user?: string,
  diagnosedConditions?: string[]; 
  otherChronicIllness?: string;    
  takingMedications?: string;
  medicationsList?: string;        
  hadSurgeries?: string;
  pastSurgeriesDetails?: string;
}


const questionnaireSchema: Schema<IMedicalHistory> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  
  diagnosedConditions: {
    type: [String], 
    enum: [
      "diabetes",
      "high-blood-pressure",
      "heart-disease",
      "hormonal-issues",
      "nerve-disorders",
      "other-chronic-illness",
    ],
  },
  otherChronicIllness: {
    type: String,
  },
  
  takingMedications: {
    type: String,
    enum: ["yes", "no"],
  },
  medicationsList: {
    type: String,
  },
  
  hadSurgeries: {
    type: String,
    enum: ["yes", "no"],
  },
  pastSurgeriesDetails: {
    type: String,
  },

});


const Medicalhistory: Model<IMedicalHistory> = mongoose.model<IMedicalHistory>(
  "medicalhistory",
  questionnaireSchema
);

export default Medicalhistory;

