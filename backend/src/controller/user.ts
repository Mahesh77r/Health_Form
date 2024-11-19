import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../schema/user";
import EjaculationIssue from "../schema/pme";
import StressSurvey from "../schema/stressandmentalwellbeing";
import RelationshipSexualHealth from "../schema/sexualhealth";
import Medicalhistory from "../schema/medicalhistory";
import LifestyleHabits from "../schema/lifestylehabits";
import ErectionIssue from "../schema/erections";

import dotenv from "dotenv";
dotenv.config();

export const RegisterUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { age, gender, occupation, city, height, weight } = req.body;

    // Create a new user instance
    const user = new User({
      age,
      gender,
      occupation,
      city,
      height,
      weight,
    });

    await user.save();

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, age, gender }, 
      process.env.TOKEN as string,        
      { expiresIn: "1h" }                 
    );

    return res.status(200).json({
      message: "User created successfully",
      user,
      token, 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const getSummary = async( req: Request, res: Response): Promise<Response> =>{
try {
   const id = req.params.id;
   const isExits = await User.findById(id);
   if(!isExits){
    return res.status(404).json({
      message: "User Not Found",
    });
   } 

  const ErectionIssueData = await ErectionIssue.findOne({user:id});
  const StressSurveyData = await StressSurvey.findOne({user:id});
  const RelationshipSexualHealthData = await RelationshipSexualHealth.findOne({user:id});
  const MedicalhistoryData = await Medicalhistory.findOne({user:id});
  const LifestyleHabitsData = await LifestyleHabits.findOne({user:id});
  const EjaculationIssueData = await EjaculationIssue.findOne({user:id});


  return res.status(200).json({
    message: "Summary fetched successfully",
    isExits,
    EjaculationIssueData,
    ErectionIssueData,
    LifestyleHabitsData,
    MedicalhistoryData,
    RelationshipSexualHealthData,
    StressSurveyData
     
  });
} catch (error) {
  console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
}
}