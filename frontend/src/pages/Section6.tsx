import React from "react";
import Form from "../Components/Form.tsx";


import { addErectionIssue } from '../services/apis.ts'
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Section6: React.FC = () => {

  const questions = [
    {
      id: 1,
      question:
        "Do you face problems while achieving an erection or maintaining during partnered sex?",
      options: [
        { value: "achieving", label: "Achieving" },
        { value: "maintaining", label: "Maintaining" },
        { value: "hardness-not-great", label: "Hardness is not great" },
      ],
      inputType: "checkbox",
    },
    {
      id: 2,
      question: "Since how long have you been feeling this issue?",
      options: [
        { value: "1-6-months", label: "1-6 months" },
        { value: "6-12-months", label: "6-12 months" },
        { value: "more-than-2-years", label: "More than 2 years" },
        { value: "more-than-5-years", label: "More than 5 years" },
        { value: "since-sexually-active", label: "Since I am sexually active" },
      ],
      inputType: "radio",
    },
    {
      id: 3,
      question: "Do you masturbate regularly?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
      inputType: "radio",
    },
    {
      id: 4,
      question: "If yes, how many times in a week?",
      options: [
        { value: "1-3", label: "1-3" },
        { value: "4-7", label: "4-7" },
        { value: "more", label: "More" },
        
      ],
      inputType: "radio",
      condition: { questionId: 3, answer: "yes" },
    },
    {
      id: 5,
      question:
        "Do you face the same erection issues during masturbation also?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
      inputType: "radio",
      condition: { questionId: 3, answer: "yes" },
    },
    {
      id: 6,
      question: "Have you ever had any other sexual partner in the past?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
      inputType: "radio",
    },
    {
      id: 7,
      question: "If yes, was the erection problem similar there too?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
      inputType: "radio",
      condition: { questionId: 6, answer: "yes" },
    },
  ];


  const navigate = useNavigate();

  const onSubmitHandler = async(e:any,data:any) =>{
    e.preventDefault();
    const loadingToast = toast.loading("Processing...");

    try {
      const headers ={}
      let res = await addErectionIssue(data,headers);
      console.log(res)
      if (res?.status === 200) {
        toast.success("Section2 Saved Successfully");
        console.log(res)
        navigate('/section7')

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
          <h1 className="text-2xl font-bold mb-4 text-center mt-5">Section 6: Erections  </h1>

      <Form questions={questions} submitHandler={onSubmitHandler}/>
    </>
  );
};

export default Section6;
