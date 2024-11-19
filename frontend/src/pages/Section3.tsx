import React from 'react'
import Form from '../Components/Form.tsx';

import { addMedicalHistory} from '../services/apis.ts'
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Section3:React.FC = () => {
    const questions = [
        {
          id: 1,
          question: "Have you been diagnosed with any of the following conditions?",
          options: [
            { value: "diabetes", label: "Diabetes" },
            { value: "high-blood-pressure", label: "High blood pressure" },
            { value: "heart-disease", label: "Heart disease" },
            { value: "hormonal-issues", label: "Hormonal issues (e.g., thyroid problems)" },
            { value: "nerve-disorders", label: "Nerve-related disorders" },
            { value: "other-chronic-illness", label: "Any other chronic illness (please specify)" },
          ],
          followUp: "If yes, please specify chronic illness:",
          inputType: "checkbox",
        },
        {
          id: 2,
          question: "Are you currently taking any medications?",
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
          followUp: "If yes, please list them:",
          inputType: "radio",
        },
        {
          id: 3,
          question: "Have you had any surgeries in the past?",
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
          followUp: "If yes, please specify:",
          inputType: "radio",
        },
      ];
      
      const navigate = useNavigate();

      const onSubmitHandler = async(e:any,data:any) =>{
        e.preventDefault();
        const loadingToast = toast.loading("Processing...");
    
        try {
          const headers ={}
          let res = await addMedicalHistory(data,headers);
          console.log(res)
          if (res?.status === 200) {
            toast.success("Section2 Saved Successfully");
            console.log(res)
            navigate('/section4')
    
          } else if (res?.status === 202) {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.error('Error during Section2:', error);
          toast.error('An error occurred during Section2');
        }
    
        finally {
          toast.dismiss(loadingToast);
        }
      };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center mt-5">Section 3: Medical History </h1>

    <Form
  submitHandler={onSubmitHandler}
    questions={questions}
    />
    </>
  )
}

export default Section3;