
import axios, { AxiosInstance,  AxiosResponse } from 'axios';

type ApiResponse<T> = AxiosResponse<T> | undefined;

interface ApiError {
  response?: {
    data: any;
    status: number;
    headers: Record<string, string>;
  };
  request?: any;
  message: string;
}


const getHeader = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  console.log(token)
  return {
    Authorization: token || '',
  };
};


const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://health-form-jtcj.onrender.com/api',
  headers: getHeader(),
});


const handleError = (error: ApiError): void => {
  if (error.response) {
    console.error('Server responded with an error:', error.response.data);
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Error setting up request:', error.message);
  }
};

// POST request to create a user
export const createUserNew = async (data: any ): Promise<ApiResponse<any>> => {
  try {
    const endpoint = '/user/add';
    const response = await apiClient.post(endpoint, data, );
    return response;
  } catch (error) {
    handleError(error as ApiError);
    return undefined;
  }
};

// PATCH request to update a user
export const updateUser = async (data: any,id:string | null, ): Promise<ApiResponse<any>> => {
  try {
    const endpoint = '/user/update';
    const response = await apiClient.patch(endpoint, data, );
    return response;
  } catch (error) {
    handleError(error as ApiError);
    return undefined;
  }
};

// POST request to add Lifestyle Habits
export const addLifestyleHabits = async (data: any,id:string | null, ): Promise<ApiResponse<any>> => {
  try {
    const endpoint = `/lifehabits/add/${id}`;
    const response = await apiClient.post(endpoint, data, );
    return response;
  } catch (error) {
    handleError(error as ApiError);
    return undefined;
  }
};

// PATCH request to update Lifestyle Habits
export const updateLifestyleHabits = async (data: any,id:string | null, ): Promise<ApiResponse<any>> => {
  try {
    const endpoint = '/lifehabits/update';
    const response = await apiClient.patch(endpoint, data, );
    return response;
  } catch (error) {
    handleError(error as ApiError);
    return undefined;
  }
};

// POST request to add Medical History
export const addMedicalHistory = async (data: any,id:string | null, ): Promise<ApiResponse<any>> => {
  try {
    const endpoint = `/medicalhistory/add/${id}`;
    const response = await apiClient.post(endpoint, data, );
    return response;
  } catch (error) {
    handleError(error as ApiError);
    return undefined;
  }
};

// PATCH request to update Medical History
export const updateMedicalHistory = async (data: any,id:string | null, ): Promise<ApiResponse<any>> => {
  try {
    const endpoint = `/medicalhistory/update/${id}`;
    const response = await apiClient.patch(endpoint, data, );
    return response;
  } catch (error) {
    handleError(error as ApiError);
    return undefined;
  }
};

// POST request to add Erection Issue
export const addErectionIssue = async (data: any,id:string | null, ): Promise<ApiResponse<any>> => {
  try {
    const endpoint = `/erectionissue/add/${id}`;
    const response = await apiClient.post(endpoint, data, );
    return response;
  } catch (error) {
    handleError(error as ApiError);
    return undefined;
  }
};

// PATCH request to update Erection Issue
export const updateErectionIssue = async (data: any,id:string | null, ): Promise<ApiResponse<any>> => {
  try {
    const endpoint = '/erectionissue/update';
    const response = await apiClient.patch(endpoint, data, );
    return response;
  } catch (error) {
    handleError(error as ApiError);
    return undefined;
  }
};

// POST request to add Sexual Health Data
export const addRelationshipSexualHealth = async (data: any,id:string | null, ): Promise<ApiResponse<any>> => {
  try {
    const endpoint = `/sexualhealth/add/${id}`;
    const response = await apiClient.post(endpoint, data, );
    return response;
  } catch (error) {
    handleError(error as ApiError);
    return undefined;
  }
};

// PATCH request to update Sexual Health Data
export const updateRelationshipSexualHealth = async (data: any,id:string | null, ): Promise<ApiResponse<any>> => {
  try {
    const endpoint = `/sexualhealth/update/${id}`;
    const response = await apiClient.patch(endpoint, data, );
    return response;
  } catch (error) {
    handleError(error as ApiError);
    return undefined;
  }
};

// POST request to add Ejaculation Issue
export const addEjaculationIssue = async (data: any,id:string | null, ): Promise<ApiResponse<any>> => {
  try {
    const endpoint = `/pme/add/${id}`;
    const response = await apiClient.post(endpoint, data, );
    return response;
  } catch (error) {
    handleError(error as ApiError);
    return undefined;
  }
};

// PATCH request to update Ejaculation Issue
export const updateEjaculationIssue = async (data: any,id:string | null, ): Promise<ApiResponse<any>> => {
  try {
    const endpoint = `/pme/update/${id}`;
    const response = await apiClient.patch(endpoint, data, );
    return response;
  } catch (error) {
    handleError(error as ApiError);
    return undefined;
  }
};

// POST request to add Stress Survey
export const addStressSurvey = async (data: any,id:string | null , ): Promise<ApiResponse<any>> => {
  try {
    const endpoint = `/stresssurvery/add/${id}`;
    const response = await apiClient.post(endpoint, data, );
    return response;
  } catch (error) {
    handleError(error as ApiError);
    return undefined;
  }
};

// PATCH request to update Stress Survey
export const updateStressSurvey = async (data: any,id:string | null, ): Promise<ApiResponse<any>> => {
  try {
    console.log(id)
    const endpoint = `/stresssurvery/update/${id}`;
    const response = await apiClient.patch(endpoint, data, );
    return response;
  } catch (error) {
    handleError(error as ApiError);
    return undefined;
  }
};
export const getSummary = async (id:string | null): Promise<ApiResponse<any>> => {
  try {
    const endpoint = `/getsummary/${id}`;
    const response = await apiClient.get(endpoint);
    return response;
  } catch (error) {
    handleError(error as ApiError);
    return undefined;
  }
};
