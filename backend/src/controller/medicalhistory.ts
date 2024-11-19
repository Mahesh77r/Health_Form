import { Request, Response } from "express";
import Medicalhistory from "../schema/medicalhistory";
export const createMedicalHistory = async (req: Request, res: Response) => {
  try {

    const data = req.body
    const medicalHistory = await Medicalhistory.create({
      user: req.params.id,
      diagnosedConditions: data.question_1,
      otherChronicIllness:data.followup_1,
      takingMedications:data.question_2,
      medicationsList:data.followup_2,
      hadSurgeries: data.question_3,
      pastSurgeriesDetails: data.followup_3,
    });
  res.status(200).json({ medicalHistory });
} catch (error) {
  res.status(400).send({ error });
}
};

export const updateMedicalHistoryByUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const updatedMedicalHistory = await Medicalhistory.findOneAndUpdate(
      { user: userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMedicalHistory) {
      return res.status(404).send({ error: "Medical history not found for the given user." });
    }

    res.status(200).json({ updatedMedicalHistory });
  } catch (error) {
    res.status(400).send({ error });
  }
};
