import React from "react";
import Form from "../Components/Form.tsx";
import { addLifestyleHabits} from '../services/apis.ts'
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Section2: React.FC = () => {

  
  const questions = [
    {
      id: 1,
      question:
        "Over the last 6 months, how do you rate your confidence that you could get and keep an erection?",
      options: [
        { value: "very-low", label: "Very low" },
        { value: "low", label: "Low" },
        { value: "moderate", label: "Moderate" },
        { value: "high", label: "High" },
        { value: "very-high", label: "Very high" },
      ],
    },
    {
      id: 2,
      question: "Do you smoke tobacco products?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
      followUp: "If yes, how many per day?",
    },
    {
      id: 3,
      question: "Do you consume alcohol?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
      followUp: "If yes, how often?",
    },
    {
      id: 4,
      question: "Do you engage in regular physical activity or exercise?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
      followUp: "If yes, what type and how often?",
    },
    {
      id: 5,
      question: "How many hours do you sleep on average per night? (in number)",
      inputType: "number",
      type: "number",
    },
  ];

  const navigate = useNavigate();

  const onSubmitHandler = async(e:any,data:any) =>{
    e.preventDefault();
    const loadingToast = toast.loading("Processing...");

    try {
      const headers ={}
      let res = await addLifestyleHabits(data,headers);
      console.log(res)
      if (res?.status === 200) {
        toast.success("Section2 Saved Successfully");
        console.log(res)
        navigate('/section3')

      } else if (res?.status === 202) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Error during Section2:', error);
      toast.error('An error occurred during Section2');
    }

    finally {
      console.log("dis")
      toast.dismiss(loadingToast);
    }
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center mt-5">Section 2: Lifestyle Habits </h1>
      <Form questions={questions} submitHandler={onSubmitHandler}/>
    </>
  );
};

export default Section2;
