import { Request, Response } from "express";
import EjaculationIssue from "../schema/pme";

export const createEjaculationIssue = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const issue = await EjaculationIssue.create({
      user: req.params.id,
      ejaculationTime: data.question_1,
      issueDuration: data.question_2,
      masturbateRegularly: data.question_3,
      similarEjaculationDuringMasturbation: data.question_4,
      hadOtherSexualPartners: data.question_5,
      similarTimingProblemWithPastPartners: data.question_6,
    });
    await issue.save();
    res.status(200).json({ issue });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const updateEjaculationIssue = async (req: Request, res: Response) => {
  try {
    const issue = await EjaculationIssue.findOneAndUpdate({ user: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!issue) {
      return res.status(404).send({ error: "Issue not found" });
    }
    res.status(200).json({ issue });

  } catch (error) {
    res.status(400).send({ error });
  }
};
