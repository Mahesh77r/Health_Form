import React from "react";
import Form from "../Components/Form.tsx";

import { addEjaculationIssue } from '../services/apis.ts'
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
const Section7: React.FC = () => {
  const questions = [
    {
      id: 1,
      question: "What is your ejaculation time during partnered sex?",
      options: [
        { value: "less-than-1-minute", label: "Less than 1 minute" },
        { value: "1-2-minutes", label: "1-2 minutes" },
        { value: "3-5-minutes", label: "3-5 minutes" },
        { value: "5-10-minutes", label: "5-10 minutes" },
        { value: "more-than-10-minutes", label: "More than 10 minutes" }
      ],
      inputType: "radio"
    },
    {
      id: 2,
      question: "Since how long have you been feeling this issue?",
      options: [
        { value: "1-6-months", label: "1-6 months" },
        { value: "6-12-months", label: "6-12 months" },
        { value: "more-than-2-years", label: "More than 2 years" },
        { value: "more-than-5-years", label: "More than 5 years" },
        { value: "since-sexually-active", label: "Since I am sexually active" }
      ],
      inputType: "radio"
    },
    {
      id: 3,
      question: "Do you masturbate regularly?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" }
      ],
      inputType: "radio"
    },
    {
      id: 4,
      question: "If yes, do you have similar ejaculation time during masturbation?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" }
      ],
      inputType: "radio",
      condition: { questionId: 3, answer: "yes" }
    },
    {
      id: 5,
      question: "Have you ever had any other sexual partner in the past?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" }
      ],
      inputType: "radio"
    },
    {
      id: 6,
      question: "If yes, was the timing problem similar there too?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" }
      ],
      inputType: "radio",
      condition: { questionId: 5, answer: "yes" }
    }
  ];
  

  const navigate = useNavigate();

  const onSubmitHandler = async(e:any,data:any) =>{
    e.preventDefault();
    const loadingToast = toast.loading("Processing...");

    try {
      const headers ={}
      let res = await addEjaculationIssue(data,headers);
      console.log(res)
      if (res?.status === 200) {
        toast.success("Section2 Saved Successfully");
        console.log(res)
        navigate('/summary')

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
          <h1 className="text-2xl font-bold mb-4 text-center mt-5">Section 7: PME  </h1>

      <Form questions={questions} submitHandler={onSubmitHandler}/>
    </>
  );
};

export default Section7;
