import React from "react";
import Form from "../Components/Form.tsx";


import { addRelationshipSexualHealth } from '../services/apis.ts'
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
const Section5: React.FC = () => {

  
  const questions=  [
        {
          id: 1,
          question: "What brings you here? (Male)",
          options: [
            { value: "You want better erections", label: "You want better erections" },
            { value: "You ejaculate sooner than you or your partner want to", label: "You ejaculate sooner than you or your partner want to" },
            { value: "You think that your foreskin on the penis is bothering you", label: "You think that your foreskin on the penis is bothering you" },
            { value: "You feel that you need to masturbate less", label: "You feel that you need to masturbate less" },
            { value: "You are experiencing a decrease in interest in sexual activity", label: "You are experiencing a decrease in interest in sexual activity" },
            { value: "You have observed any bending or curvature of the penis during erections", label: "You have observed any bending or curvature of the penis during erections" },
            { value: "You have noticed any sores, rashes, or unusual discharge in the genital area", label: "You have noticed any sores, rashes, or unusual discharge in the genital area" },
            { value: "Others", label: "Others, please specify" }
          ],
          inputType: "checkbox",
          followUp: "Please specify if you selected 'Others'"
        },
        {
          id: 2,
          question: "What brings you here? (Female)",
          options: [
            { value: "pain-during-penetration", label: "You are experiencing pain during penetration which makes intercourse almost impossible" },
            { value: "partner-help", label: "You want your partner to be helped" },
            { value: "decrease-interest", label: "You are experiencing a decrease in interest in sexual activity" },
            { value: "no-orgasm", label: "You are not able to achieve orgasm lately" },
            { value: "others", label: "Others, please specify" }
          ],
          inputType: "checkbox",
          followUp: "Please specify if you selected 'Others'"
        },
        {
          id: 3,
          question: "Are you currently married or in a committed relationship?",
          options: [
            { value: "in-relationship", label: "Yes, in a relationship" },
            { value: "not-in-relationship", label: "No, not in a relationship currently" }
          ],
          inputType: "radio"
        },
        {
          id: 4,
          question: "If yes, are you sexually active with your current partner?",
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          inputType: "radio"
        }
      ]
      
     
      const navigate = useNavigate();

      const onSubmitHandler = async(e:any,data:any) =>{
        e.preventDefault();
        const loadingToast = toast.loading("Processing...");
    
        try {
          const headers ={}
          let res = await addRelationshipSexualHealth(data,headers);
          console.log(res)
          if (res?.status === 200) {
            toast.success("Section2 Saved Successfully");
            console.log(res)
            navigate('/section6')
    
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
          <h1 className="text-2xl font-bold mb-4 text-center mt-5">Section 5: Sexual Health </h1>

      <Form questions={questions}  submitHandler={onSubmitHandler}/>
    </>
  );
};

export default Section5;
