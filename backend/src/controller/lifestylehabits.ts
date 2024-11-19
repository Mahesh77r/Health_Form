import { Request, Response } from "express";
import LifestyleHabits from "../schema/lifestylehabits";

export const createLifestyleHabits = async (req: Request, res: Response) => {
  try {
    
    const data = req.body;
    const lifestyleData = await LifestyleHabits.create({
      user:req.params.id,
      confidenceInErection: data.question_1,
      smokeTobacco: data.question_2,
      smokeTobaccoFrequency: data.followup_2,
      consumeAlcohol: data.question_3,
      alcoholFrequency: data.followup_3,
      physicalActivity:data.question_4,
      physicalActivityDetails: data.followup_4,
      averageSleepHours: data.question_5

    });
    res.status(200).json({lifestyleData});
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const updateLifestyleHabitsByUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const updatedData = await LifestyleHabits.findOneAndUpdate(
      { user: userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedData) {
      return res.status(404).send({ error: "Lifestyle habits data not found for the given user." });
    }

    res.status(200).json({updatedData});
  } catch (error) {
    res.status(400).send({ error });
  }
};
