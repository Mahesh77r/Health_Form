import { Request, Response } from "express";
import RelationshipSexualHealth from "../schema/sexualhealth";

export const createRelationshipSexualHealth = async (req: Request, res: Response) => {
  try {

    const data = req.body;
    console.log(data)
    const relationshipData = await RelationshipSexualHealth.create({
      user: req.params.id,
      maleConcerns: data.question_1,
      maleOtherDetails: data.followup_1,
      femaleConcerns: data.question_2,
      femaleOtherDetails: data.followup_2,
      relationshipStatus: data.question_3,
      sexuallyActive: data.question_4
    });
    res.status(200).json({ relationshipData });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const updateRelationshipSexualHealthByUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const updatedData = await RelationshipSexualHealth.findOneAndUpdate(
      { user: userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedData) {
      return res.status(404).send({ error: "Relationship or Sexual Health data not found for the given user." });
    }

    res.status(200).json({ updatedData });
  } catch (error) {
    res.status(400).send({ error });
  }
};
