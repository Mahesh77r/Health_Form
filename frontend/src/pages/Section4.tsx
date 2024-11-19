import React from "react";
import Form from "../Components/Form.tsx";


import { addStressSurvey } from '../services/apis.ts'
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Section4: React.FC = () => {

  
  const questions = [
    {
      id: 1,
      question: "On a scale of 1 to 10, how would you rate your stress levels? (1 = Very Low, 10 = Very High)",
      inputType: "number",
    },
    {
      id: 2,
      question: "Have you experienced any significant life changes or stressful events lately?",
      inputType: "radio",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" }
      ],
      followUp: "If yes, please specify:"
    },
    {
      id: 3,
      question: "How is your relationship with your partner?",
      inputType: "text",
      followUp: "Please describe the relationship quality or concerns:"
    }
  ]
   
  const navigate = useNavigate();

  const onSubmitHandler = async(e:any,data:any) =>{
    e.preventDefault();
    const loadingToast = toast.loading("Processing...");

    try {
      const headers ={}
      let res = await addStressSurvey(data,headers);
      console.log(res)
      if (res?.status === 200) {
        toast.success("Section2 Saved Successfully");
        console.log(res)
        navigate('/section5')

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
          <h1 className="text-2xl font-bold mb-4 text-center mt-5">Section 4:  Stress and Mental Well-being </h1>
      <Form questions={questions}  submitHandler={onSubmitHandler}/>
    </>
  );
};

export default Section4;
