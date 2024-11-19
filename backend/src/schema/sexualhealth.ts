import mongoose, { Schema, Document, Model } from "mongoose";


interface IRelationshipSexualHealth extends Document {
    user?:string;
    maleConcerns?: string[];
    maleOtherDetails?: string;
    femaleConcerns?: string[];
    femaleOtherDetails?: string;
    relationshipStatus?: string;
    sexuallyActive?: string;
}

const relationshipSexualHealthSchema: Schema<IRelationshipSexualHealth> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    maleConcerns: {
        type: [String],
        enum: [
            "You want better erections", "You want better erections", "You ejaculate sooner than you or your partner want to", "You think that your foreskin on the penis is bothering you", "You feel that you need to masturbate less", "You are experiencing a decrease in interest in sexual activity", "You have observed any bending or curvature of the penis during erections", "You have noticed any sores, rashes, or unusual discharge in the genital area", "Others",
        ],
    },
    maleOtherDetails: {
        type: String,
    },


    femaleConcerns: {
        type: [String],
        enum: [
            "pain-during-penetration",
            "partner-help",
            "decrease-interest",
            "no-orgasm",
            "others",
        ],
    },
    femaleOtherDetails: {
        type: String,
    },

    relationshipStatus: {
        type: String,
        enum: ["in-relationship", "not-in-relationship"],
    },

    sexuallyActive: {
        type: String,
        enum: ["yes", "no"],
    },
});

const RelationshipSexualHealth: Model<IRelationshipSexualHealth> = mongoose.model<IRelationshipSexualHealth>(
    "RelationshipSexualHealth",
    relationshipSexualHealthSchema
);

export default RelationshipSexualHealth;
