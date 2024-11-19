import React, { FormEvent, useState,useRef } from "react";
import { Input } from "../Components/Inputs.tsx";
import { Label } from "../Components/Lables.tsx";
import { Buttons } from "../Components/Buttons.tsx";
import { Select } from "../Components/Select.tsx";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import { createUserNew } from "../services/apis.ts";


const BasicInfo: React.FC = () => {
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    occupation: "",
    city: "",
    gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Gender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "Other", label: "Others" },
  ];
  const navigate = useNavigate();
  
  const handleSubmit = async(e:any) => {
    e.preventDefault();
    
    try {
      
      const headers ={}
      let res = await createUserNew(formData,headers);
      console.log(res)
      if (res?.status === 200) {
        toast.success("BasicInfo Saved Successfully");
      navigate('/section2');
        console.log(res)
        localStorage.setItem('id',res.data.user._id)
        localStorage.setItem('token',res.data.token)

      } else if (res?.status === 202) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Error during BasicINfo:', error);
      toast.error('An error occurred during BasicInfo');
    }

    finally {
      console.log("dis")
      // toast.dismiss(loadingToast);
    }

  };

  return (
    <div className="p-4 mt-5 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Section 1: Basic Information
      </h2>

      <div className="mb-4">
        <Label htmlFor="age" title="Age" />
        <Input
          id="age"
          name="age"
          type="number"
          placeholder="Enter your age"
          value={formData.age}
          onChange={handleChange}
          className="border border-gray-300 rounded-md mt-1 w-full"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="height" title="Height (cm)" />
        <Input
          id="height"
          name="height"
          type="number"
          placeholder="Enter your height"
          value={formData.height}
          onChange={handleChange}
          className="border border-gray-300 rounded-md mt-1 w-full"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="weight" title="Weight (kg)" />
        <Input
          id="weight"
          name="weight"
          type="number"
          placeholder="Enter your weight"
          value={formData.weight}
          onChange={handleChange}
          className="border border-gray-300 rounded-md mt-1 w-full"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="occupation" title="Occupation" />
        <Input
          id="occupation"
          name="occupation"
          type="text"
          placeholder="Enter your occupation"
          value={formData.occupation}
          onChange={handleChange}
          className="border border-gray-300 rounded-md mt-1 w-full"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="city" title="City" />
        <Input
          id="city"
          name="city"
          type="text"
          placeholder="Enter your city"
          value={formData.city}
          onChange={handleChange}
          className="border border-gray-300 rounded-md mt-1 w-full"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="gender" title="Gender" />
        <Select options={Gender} name="gender" id="gender" value={formData.gender} className="border border-gray-300 rounded-md mt-1 w-full" onChange={handleChange} required/>
      </div>

      <Buttons
        title="Save and Next"
        onclickfunction={(e)=>handleSubmit(e)}
        className="w-full text-center hover:bg-[#4165c9] bg-[#345bc3] text-white"
      />
    </div>
  );
};

export default BasicInfo;
