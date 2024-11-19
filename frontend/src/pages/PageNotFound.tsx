import React from "react";
import { useNavigate } from "react-router-dom";
const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
      <button
        onClick={handleGoHome}
        className="mt-6 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
