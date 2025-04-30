import axiosInstance, { endpoints } from "@/utils/axios";
import { SignUp } from "./types/auth";

export const forgotPassword = async (email: string): Promise<void> => {
  try {
    const response = await axiosInstance.post(endpoints.auth.forgotPassword, {
      email,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const signUp = async (data: SignUp): Promise<void> => {
  try {
    const response = await axiosInstance.post(endpoints.auth.signUp, data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
