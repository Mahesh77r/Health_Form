import mongoose, { Schema, Document, Model } from "mongoose";

interface ISexualHealthIssue extends Document {
  user?:string
  erectionProblems?: string[];
  issueDuration?: string;
  masturbateRegularly?: string;
  masturbationFrequency?: string;
  erectionIssuesDuringMasturbation?: string;
  hadOtherSexualPartners?: string;
  similarErectionProblemsWithPastPartners?: string;
}

const sexualHealthIssueSchema: Schema<ISexualHealthIssue> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

  erectionProblems: {
    type: [String],
    enum: [
      "achieving",           
      "maintaining",        
      "hardness-not-great"   
    ],
  },

  issueDuration: {
    type: String,
    enum: [
      "1-6-months",             
      "6-12-months",            
      "more-than-2-years",      
      "more-than-5-years",      
    ],
  },
  masturbateRegularly: {
    type: String,
    enum: ["yes", "no"],
  },
  masturbationFrequency: {
    type: String,
    enum: ["1-3", "4-7", "more"],
    required: function () {
      return this.masturbateRegularly === "yes";
    },
  },
  erectionIssuesDuringMasturbation: {
    type: String,
    enum: ["yes", "no"],
    required: function () {
      return this.masturbateRegularly === "yes";
    },
  },

  hadOtherSexualPartners: {
    type: String,
    enum: ["yes", "no"],
  },
  
  similarErectionProblemsWithPastPartners: {
    type: String,
    enum: ["yes", "no"],
    required: function () {
      return this.hadOtherSexualPartners === "yes";
    },
  },
});

const SexualHealthIssue: Model<ISexualHealthIssue> = mongoose.model<ISexualHealthIssue>(
  "SexualHealthIssue",
  sexualHealthIssueSchema
);

export default SexualHealthIssue;
