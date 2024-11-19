import mongoose, { Schema, Document, Model } from "mongoose";

interface IEjaculationIssue extends Document {
  user?:string
  ejaculationTime?: string;
  issueDuration?: string;
  masturbateRegularly?: string;
  similarEjaculationDuringMasturbation?: string;
  hadOtherSexualPartners?: string;
  similarTimingProblemWithPastPartners?: string;
}

const ejaculationIssueSchema: Schema<IEjaculationIssue> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

  ejaculationTime: {
    type: String,
    enum: [
      "less-than-1-minute",
      "1-2-minutes",
      "3-5-minutes",
      "5-10-minutes",
      "more-than-10-minutes"
    ],
  },
  issueDuration: {
    type: String,
    enum: [
      "1-6-months",
      "6-12-months",
      "more-than-2-years",
      "more-than-5-years",
      "since-sexually-active"
    ],
  },
  masturbateRegularly: {
    type: String,
    enum: ["yes", "no"],
  },
  similarEjaculationDuringMasturbation: {
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
  similarTimingProblemWithPastPartners: {
    type: String,
    enum: ["yes", "no"],
    required: function () {
      return this.hadOtherSexualPartners === "yes";
    },
  },
});

const EjaculationIssue: Model<IEjaculationIssue> = mongoose.model<IEjaculationIssue>(
  "EjaculationIssue",
  ejaculationIssueSchema
);

export default EjaculationIssue;
