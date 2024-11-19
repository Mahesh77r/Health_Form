import React from "react";
import { Buttons } from "../Components/Buttons.tsx"; 
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
    
  const startSurvey = () => {
    navigate('/basicinfo');

  };

  return (
    <div className="p-8 max-w-lg mx-auto mt-10 text-center items-center align-middle bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-[#2e5cdc]">Welcome to the Health Survey</h1>
      
      <p className="text-lg text-gray-700 mb-4">
        We care about your health and well-being. This survey will help us understand your health-related habits and concerns better.
        Please answer the questions honestly to ensure we provide the best guidance.
      </p>
      
      <p className="text-md text-gray-600 mb-8">
        The information you provide is confidential and will be used solely to improve your health assessment.
        This survey should take only a few minutes.
      </p>
      
      <Buttons
        title="Start the Survey"
        onclickfunction={startSurvey}
        className="px-6 py-3 bg-[#2e5cdc] text-white rounded-md hover:bg-[#446fe6]"
      />
    </div>
  );
};

export default WelcomePage;
