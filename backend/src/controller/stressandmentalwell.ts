import { Request, Response } from "express";
import StressSurvey from "../schema/stressandmentalwellbeing";

export const createStressSurvey = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const survey = await StressSurvey.create({
      user: req.params.id,
      stressLevel: data.question_1,
      significantLifeChange: data.question_2,
      lifeChangeDetails: data.followup_2,
      relationshipWithPartner: data.question_3,
      relationshipDetails: data.followup_3
    });
    res.status(200).json({ survey });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const updateStressSurvey = async (req: Request, res: Response) => {
  try {
    const survey = await StressSurvey.findOneAndUpdate({ user: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!survey) {
      return res.status(404).send({ error: "Survey not found" });
    }
    res.status(200).json({ survey });
  } catch (error) {
    res.status(400).send({ error });
  }
};
