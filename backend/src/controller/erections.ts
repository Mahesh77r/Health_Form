import { Request, Response } from "express";
import ErectionIssue from "../schema/erections";

export const createErectionIssue = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const issue = await ErectionIssue.create({
      user:req.params.id,
      erectionProblems: data.question_1,
      issueDuration: data.question_2,
      masturbateRegularly: data.question_3,
      masturbationFrequency: data.question_4,
      erectionIssuesDuringMasturbation: data.question_5,
      hadOtherSexualPartners: data.question_6,
      similarErectionProblemsWithPastPartners: data.question_7
    });
    res.status(200).json({issue});
  } catch (error) {
    res.status(400).send({ error});
  }
};

export const updateErectionIssue = async (req: Request, res: Response) => {
  try {
    const issue = await ErectionIssue.findOneAndUpdate({user : req.params.id}, req.body, {
      new: true,
      runValidators: true,
    });
    if (!issue) {
      return res.status(404).send({ error: "Issue not found" });
    }
    res.status(200).json({issue});

  } catch (error) {
    res.status(400).send({ error });
  }
};
