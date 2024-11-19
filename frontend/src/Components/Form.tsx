import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "./Inputs.tsx";
import { Buttons } from "./Buttons.tsx";
import { BackIcon, NextIcon } from "../utils/Icons.tsx";
import './Form.css';

interface Condition {
  questionId: number;
  answer: string;
}

interface Question {
  id: number;
  question: string;
  options?: { value: string; label: string }[];
  inputType?: string;
  followUp?: string;
  condition?: Condition;
}

type FormDataType = Record<string, string | number | string[]>;

interface FormProps {
  questions: Question[];
  submitHandler: (e: FormEvent, data: FormDataType) => Promise<void>;
}

const Form: React.FC<FormProps> = ({ questions, submitHandler }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [formData, setFormData] = useState<Record<string, string | number | string[]>>({});
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading,setLoading] = useState<boolean>(false);


  const isQuestionVisible = (question: Question): boolean => {
    if (!question.condition) return true;

    const { questionId, answer } = question.condition;
    const conditionField = `question_${questionId}`;
    const userAnswer = formData[conditionField];

    return userAnswer === answer;
  };

  const getNextVisibleQuestionIndex = (startIndex: number): number => {
    for (let i = startIndex; i < questions.length; i++) {
      if (isQuestionVisible(questions[i])) return i;
    }
    return -1;
  };

  const handleNext = () => {
    const currentQuestionField = `question_${questions[currentQuestion].id}`;
    const currentQuestionValue = formData[currentQuestionField];

    // Validation: Ensure input is not empty or unchecked
    if (
      !currentQuestionValue || 
      (Array.isArray(currentQuestionValue) && currentQuestionValue.length === 0)
    ) {
      setError("Please select an option or fill the input.");
      return;
    }

    setError("");
    const nextQuestionIndex = getNextVisibleQuestionIndex(currentQuestion + 1);
    if (nextQuestionIndex !== -1) {
      setCurrentQuestion(nextQuestionIndex);
      setProgress(((nextQuestionIndex + 1) / questions.length) * 100);
    }
  };

  const handleBack = () => {
    setError("");
    const previousVisibleQuestionIndex = getNextVisibleQuestionIndex(currentQuestion - 1);
    if (previousVisibleQuestionIndex !== -1) {
      setCurrentQuestion(previousVisibleQuestionIndex);
      setProgress(((previousVisibleQuestionIndex + 1) / questions.length) * 100);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      const currentSelection = (formData[name] as string[]) || [];

      if ((event.target as HTMLInputElement).checked) {
        setFormData({ ...formData, [name]: [...currentSelection, value] });
      } else {
        setFormData({
          ...formData,
          [name]: currentSelection.filter((selected) => selected !== value),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setError("");
  };

  if (!isQuestionVisible(questions[currentQuestion])) {
    handleNext();
    return null;
  }

  const submitData = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true)
      
      // Validation for the last question
      const currentQuestionField = `question_${questions[currentQuestion].id}`;
      const currentQuestionValue = formData[currentQuestionField];
      if (
        !currentQuestionValue || 
        (Array.isArray(currentQuestionValue) && currentQuestionValue.length === 0)
      ) {
        setError("Please select an option or fill the input.");
        return;
      }
      
      console.log(formData);
      await  submitHandler(e, formData);
      setLoading(false)
    } catch (error) {
      console.log("Error In Form Components");
    }
  };

  return (
    <div className="form-container bg-white rounded">
      <Buttons
        title="Back"
        onclickfunction={handleBack}
        className="button-back"
        disabled={currentQuestion === 0 ? true : false}
        icon={BackIcon}
      />

      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="question-container ">
        <label className="question-label">
          {questions[currentQuestion].question}
        </label>

        {questions[currentQuestion].options ? (
          <div className="options-container">
            {questions[currentQuestion].options.map((option) => (
              <div key={option.value} className="option-item">
                <Input
                  type={questions[currentQuestion].inputType || "radio"}
                  id={`question_${questions[currentQuestion].id}-${option.value}`}
                  name={`question_${questions[currentQuestion].id}`}
                  value={option.value}
                  checked={
                    questions[currentQuestion].inputType === "checkbox"
                      ? (formData[`question_${questions[currentQuestion].id}`] as string[] || []).includes(option.value)
                      : formData[`question_${questions[currentQuestion].id}`] === option.value
                  }
                  onChange={handleChange}
                  className='input-option'
                />
                <label
                  htmlFor={`question_${questions[currentQuestion].id}-${option.value}`}
                  className="option-label"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <Input
            id={`question_${questions[currentQuestion].id}`}
            name={`question_${questions[currentQuestion].id}`}
            type={questions[currentQuestion].inputType || "text"}
            placeholder="Enter your response"
            value={formData[`question_${questions[currentQuestion].id}`] || ""}
            onChange={handleChange}
            className="input-field"
          />
        )}

        {questions[currentQuestion].followUp && (
          <Input
            id={`followup_${questions[currentQuestion].id}`}
            name={`followup_${questions[currentQuestion].id}`}
            type="text"
            placeholder={questions[currentQuestion].followUp}
            value={formData[`followup_${questions[currentQuestion].id}`] || ""}
            onChange={handleChange}
            className="input-followup"
          />
        )}
      </div>

      {error && <p className="error-message">{error}</p>}

      <Buttons
        title={ loading ? 'Loading...' : (currentQuestion === questions.length - 1 ? "Finish" : "Next")} 
        onclickfunction={(e) => {
          if (currentQuestion === questions.length - 1) {
            submitData(e);
          } else {
            handleNext();
          }
        }}
        className="button-next"
        disabled={ loading ? true : false}
        icon={NextIcon}
      />
    </div>
  );
};

export default Form;
