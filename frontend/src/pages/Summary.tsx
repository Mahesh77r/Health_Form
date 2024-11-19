import React, { useEffect, useState } from 'react';
import { getSummary } from '../services/apis.ts';
import {Buttons} from '../Components/Buttons.tsx'
import { HomeIcon } from '../utils/Icons.tsx';
import { useNavigate } from 'react-router-dom';
interface PatientData {
    age: number;
    weight: number;
    height: number;
    occupation: string;
    city: string;
    gender: string;
  }
  
  interface MedicalHistory {
    diagnosedConditions: string[];
    otherChronicIllness?: string;
    takingMedications: string;
    medicationsList?: string;
    hadSurgeries: string;
    pastSurgeriesDetails?: string;
  }
  
  interface LifestyleData {
    smoking: string;
    smokingfrq:string;
    consumeAlcohol: string;
    alcoholFrequency: string;
    physicalActivity: string;
    physicalActivityDetails: string;
    averageSleepHours: number;
  }
  
  
  interface SexualHealth {
    maleConcerns?: string[];
    femaleConcerns?: string[];
    relationshipStatus: string;
    sexuallyActive: string;
  }
  
  interface ErectionIssues {
    erectionProblems: string[];
    issueDuration: string;
    masturbateRegularly: string;
    masturbationFrequency?: string;
    erectionIssuesDuringMasturbation?: string;
    hadOtherSexualPartners: string;
    similarErectionProblemsWithPastPartners?: string;
  }
  
  interface EjaculationIssues {
    ejaculationTime: string;
    issueDuration: string;
    masturbateRegularly: string;
    similarEjaculationDuringMasturbation?: string;
    hadOtherSexualPartners: string;
    similarTimingProblemWithPastPartners?: string;
  }
  
  interface StressData {
    stressLevel: number;
    significantLifeChange: string;
    lifeChangeDetails?: string;
    relationshipWithPartner: string;
    relationshipDetails?: string;
  }
  
  const Summary: React.FC = () => {
    const navigate = useNavigate();

    const handleback = () =>{
        navigate('/');
    }
    const [patientInfo, setPatientInfo] = useState<PatientData | null>(null);
    const [medicalHistory, setMedicalHistory] = useState<MedicalHistory | null>(null);
    const [lifestyleData, setLifestyleData] = useState<LifestyleData | null>(null);
    const [sexualHealth, setSexualHealth] = useState<SexualHealth | null>(null);
    const [erectionIssues, setErectionIssues] = useState<ErectionIssues | null>(null);
    const [ejaculationIssues, setEjaculationIssues] = useState<EjaculationIssues | null>(null);
    const [stressData, setStressData] = useState<StressData | null>(null);
  
    useEffect(() => {
      getSummaryData();
    }, []);
  
    const getSummaryData = async () => {
      try {
        const res = await getSummary();
        const data = res?.data;
        console.log(res?.data)
        if (data) {
          // Set data for each section
          setPatientInfo({
            age: data.isExits.age,
            weight: data.isExits.weight,
            height: data.isExits.height,
            occupation: data.isExits.occupation,
            city: data.isExits.city,
            gender: data.isExits.gender,
          });
  
          setMedicalHistory({
            diagnosedConditions: data.MedicalhistoryData.diagnosedConditions || [],
            otherChronicIllness: data.MedicalhistoryData.otherChronicIllness,
            takingMedications: data.MedicalhistoryData.takingMedications,
            medicationsList: data.MedicalhistoryData.medicationsList,
            hadSurgeries: data.MedicalhistoryData.hadSurgeries,
            pastSurgeriesDetails: data.MedicalhistoryData.pastSurgeriesDetails,
          });
  
          // Assuming LifestyleData is available in the API response
          setLifestyleData({
            smoking: data.LifestyleHabitsData.smokeTobacco || 'No',
            smokingfrq: data.LifestyleHabitsData.smokeTobaccoFrequency || 'Not Mentioned',
            consumeAlcohol: data.LifestyleHabitsData.consumeAlcohol || 'No',
            alcoholFrequency: data.LifestyleHabitsData.alcoholFrequency || 'No',
            physicalActivity: data.LifestyleHabitsData.physicalActivity || '',
            physicalActivityDetails: data.LifestyleHabitsData.physicalActivityDetails || '',
            averageSleepHours: data.LifestyleHabitsData.averageSleepHours || 0,
          });
  
          setSexualHealth({
            maleConcerns: data.RelationshipSexualHealthData.maleConcerns || [],
            femaleConcerns: data.RelationshipSexualHealthData.femaleConcerns || [],
            relationshipStatus: data.RelationshipSexualHealthData.relationshipStatus,
            sexuallyActive: data.RelationshipSexualHealthData.sexuallyActive,
          });
  
          setErectionIssues({
            erectionProblems: data.ErectionIssueData.erectionProblems || [],
            issueDuration: data.ErectionIssueData.issueDuration,
            masturbateRegularly: data.ErectionIssueData.masturbateRegularly,
            masturbationFrequency: data.ErectionIssueData.masturbationFrequency,
            erectionIssuesDuringMasturbation: data.ErectionIssueData.erectionIssuesDuringMasturbation,
            hadOtherSexualPartners: data.ErectionIssueData.hadOtherSexualPartners,
            similarErectionProblemsWithPastPartners: data.ErectionIssueData.similarErectionProblemsWithPastPartners,
          });
  
          setEjaculationIssues({
            ejaculationTime: data.EjaculationIssueData.ejaculationTime,
            issueDuration: data.EjaculationIssueData.issueDuration,
            masturbateRegularly: data.EjaculationIssueData.masturbateRegularly,
            similarEjaculationDuringMasturbation: data.EjaculationIssueData.similarEjaculationDuringMasturbation,
            hadOtherSexualPartners: data.EjaculationIssueData.hadOtherSexualPartners,
            similarTimingProblemWithPastPartners: data.EjaculationIssueData.similarTimingProblemWithPastPartners,
          });
  
          setStressData({
            stressLevel: data.StressSurveyData.stressLevel,
            significantLifeChange: data.StressSurveyData.significantLifeChange,
            lifeChangeDetails: data.StressSurveyData.lifeChangeDetails,
            relationshipWithPartner: data.StressSurveyData.relationshipWithPartner,
            relationshipDetails: data.StressSurveyData.relationshipDetails,
          });
        }
      } catch (error) {
        console.log('While Fetching Summary', error);
      }
    };
  return (
    <div className="container mx-auto p-6">
      {/* Patient Information Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">Patient Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <p><span className="font-semibold">Age:</span> {patientInfo?.age}</p>
          <p><span className="font-semibold">Gender:</span> {patientInfo?.gender}</p>
          <p><span className="font-semibold">Occupation:</span> {patientInfo?.occupation}</p>
          <p><span className="font-semibold">City:</span> {patientInfo?.city}</p>
          <p><span className="font-semibold">Height:</span> {patientInfo?.height} cm</p>
          <p><span className="font-semibold">Weight:</span> {patientInfo?.weight} kg</p>
        </div>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">Patient Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <p><span className="font-semibold">Smoke:</span> {lifestyleData?.smoking}</p>
          <p><span className="font-semibold">Frequency of Smoking:</span> {lifestyleData?.smokingfrq}</p>
          <p><span className="font-semibold">Consume Alcohol:</span> {lifestyleData?.consumeAlcohol}</p>
          <p><span className="font-semibold">Frequency of Consuming Alcohol:</span> {lifestyleData?.alcoholFrequency}</p>
          <p><span className="font-semibold">Physcial Activity:</span> {lifestyleData?.physicalActivity}</p>
          <p><span className="font-semibold">Physcial Activity Details:</span> {lifestyleData?.physicalActivityDetails}</p>
          <p><span className="font-semibold">Avarage Sleep Hours:</span> {lifestyleData?.averageSleepHours}</p>
        </div>
      </section>

      {/* Medical History Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">Medical History</h2>
        <ul className="list-disc list-inside mb-4">
          {medicalHistory?.diagnosedConditions.map((condition, index) => (
            <li key={index} className="text-gray-700">{condition}</li>
          ))}
        </ul>
        {medicalHistory?.otherChronicIllness && (
          <p><span className="font-semibold">Other Chronic Illness:</span> {medicalHistory?.otherChronicIllness}</p>
        )}
        <p><span className="font-semibold">Taking Medications:</span> {medicalHistory?.takingMedications}</p>
        {medicalHistory?.medicationsList && (
          <p><span className="font-semibold">Medications List:</span> {medicalHistory?.medicationsList}</p>
        )}
        <p><span className="font-semibold">Had Surgeries:</span> {medicalHistory?.hadSurgeries}</p>
        {medicalHistory?.pastSurgeriesDetails && (
          <p><span className="font-semibold">Past Surgeries Details:</span> {medicalHistory?.pastSurgeriesDetails}</p>
        )}
      </section>

      {/* Relationship & Sexual Health Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">Relationship & Sexual Health</h2>
        <div className="mb-4">
          <p className="font-semibold">Male Concerns:</p>
          <ul className="list-disc list-inside text-gray-700">
            {sexualHealth?.maleConcerns?.map((concern, index) => (
              <li key={index}>{concern}</li>
            ))}
          </ul>
        </div>
        <p><span className="font-semibold">Relationship Status:</span> {sexualHealth?.relationshipStatus}</p>
        <p><span className="font-semibold">Sexually Active:</span> {sexualHealth?.sexuallyActive}</p>
      </section>

      {/* Erection Issues Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">Erection Issues</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Erection Problems:</p>
            <ul className="list-disc list-inside text-gray-700">
              {erectionIssues?.erectionProblems.map((problem, index) => (
                <li key={index}>{problem}</li>
              ))}
            </ul>
          </div>
          <p><span className="font-semibold">Issue Duration:</span> {erectionIssues?.issueDuration}</p>
          <p><span className="font-semibold">Masturbate Regularly:</span> {erectionIssues?.masturbateRegularly}</p>
          {erectionIssues?.masturbationFrequency && (
            <p><span className="font-semibold">Masturbation Frequency:</span> {erectionIssues?.masturbationFrequency} times/week</p>
          )}
          {erectionIssues?.erectionIssuesDuringMasturbation && (
            <p><span className="font-semibold">Erection Issues During Masturbation:</span> {erectionIssues?.erectionIssuesDuringMasturbation}</p>
          )}
          <p><span className="font-semibold">Had Other Sexual Partners:</span> {erectionIssues?.hadOtherSexualPartners}</p>
          {erectionIssues?.similarErectionProblemsWithPastPartners && (
            <p><span className="font-semibold">Similar Problems With Past Partners:</span> {erectionIssues?.similarErectionProblemsWithPastPartners}</p>
          )}
        </div>
      </section>

      {/* Ejaculation Issues Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">Ejaculation Issues</h2>
        <div className="grid grid-cols-2 gap-4">
          <p><span className="font-semibold">Ejaculation Time:</span> {ejaculationIssues?.ejaculationTime}</p>
          <p><span className="font-semibold">Issue Duration:</span> {ejaculationIssues?.issueDuration}</p>
          <p><span className="font-semibold">Masturbate Regularly:</span> {ejaculationIssues?.masturbateRegularly}</p>
          {ejaculationIssues?.similarEjaculationDuringMasturbation && (
            <p><span className="font-semibold">Similar Ejaculation During Masturbation:</span> {ejaculationIssues?.similarEjaculationDuringMasturbation}</p>
          )}
          <p><span className="font-semibold">Had Other Sexual Partners:</span> {ejaculationIssues?.hadOtherSexualPartners}</p>
          {ejaculationIssues?.similarTimingProblemWithPastPartners && (
            <p><span className="font-semibold">Similar Timing Problems in the Past:</span> {ejaculationIssues?.similarTimingProblemWithPastPartners}</p>
          )}
        </div>
      </section>

      {/* Stress & Emotional Well-being Section */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">Stress & Emotional Well-being</h2>
        <div className="grid grid-cols-2 gap-4">
          <p><span className="font-semibold">Stress Level (1-10):</span> {stressData?.stressLevel}</p>
          <p><span className="font-semibold">Significant Life Changes:</span> {stressData?.significantLifeChange}</p>
          {stressData?.lifeChangeDetails && (
            <p><span className="font-semibold">Details:</span> {stressData?.lifeChangeDetails}</p>
          )}
          <p><span className="font-semibold">Relationship With Partner:</span> {stressData?.relationshipWithPartner}</p>
          {stressData?.relationshipDetails && (
            <p><span className="font-semibold">Relationship Details:</span> {stressData?.relationshipDetails}</p>
          )}
        </div>
      </section>
      <div className='flex justify-center'>
      <Buttons
        title="Back to Home"
        onclickfunction={handleback}
        className="mt-5  text-white bg-[#345bc3] hover:bg-[#466acf]"
        icon={HomeIcon}
        />
        </div>
    </div>
  );
};

export default Summary;
