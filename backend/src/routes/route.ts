import { Router, Request, Response } from "express";
import { getSummary, RegisterUser,updateUser } from "../controller/user";
import { createLifestyleHabits,updateLifestyleHabitsByUser } from "../controller/lifestylehabits";
import { createMedicalHistory,updateMedicalHistoryByUser } from "../controller/medicalhistory";
import { createErectionIssue,updateErectionIssue } from "../controller/erections";
import { createRelationshipSexualHealth,updateRelationshipSexualHealthByUser } from "../controller/sexualhealth";

import { createEjaculationIssue,updateEjaculationIssue } from "../controller/pme";
import { createStressSurvey,updateStressSurvey } from "../controller/stressandmentalwell";

const router = Router();

router.post("/user/add", RegisterUser);
router.patch("/user/update/:id", updateUser);

router.post("/lifehabits/add/:id", createLifestyleHabits);
router.patch("/lifehabits/update/:id", updateLifestyleHabitsByUser);

router.post("/medicalhistory/add/:id", createMedicalHistory);
router.patch("/medicalhistory/update/:id", updateMedicalHistoryByUser);

router.post("/erectionissue/add/:id", createErectionIssue);
router.patch("/erectionissue/update/:id", updateErectionIssue);

router.post("/sexualhealth/add/:id", createRelationshipSexualHealth);
router.patch("/sexualhealth/update/:id", updateRelationshipSexualHealthByUser);

router.post("/pme/add/:id", createEjaculationIssue);
router.patch("/pme/update/:id", updateEjaculationIssue);

router.post("/stresssurvery/add/:id", createStressSurvey);
router.patch("/stresssurvery/update/:id", updateStressSurvey);

router.get('/getsummary/:id',getSummary);


router.get("/test", (_req: Request, res: Response) => {
  res.status(200).send("API is working!");
});

export default router;
