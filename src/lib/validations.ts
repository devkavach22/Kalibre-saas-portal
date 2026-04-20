import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordStep1Schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

export const forgotPasswordStep2Schema = z.object({
  temp_password: z.string().min(1, "Temporary password is required"),
  new_password: z.string().min(6, "Password must be at least 6 characters"),
  confirm_password: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});

export const candidateRegisterSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  gender: z.string().min(1, "Gender is required"),
  dob: z.string().min(1, "Date of birth is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  verification_key: z.string().min(1, "Verification key is required"),
});

export const employerRegisterSchema = z.object({
  gst_number: z.string().min(15, "GST number must be 15 characters").max(15, "GST number must be 15 characters"),
  name: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  street: z.string().min(1, "Street 1 is required"),
  street2: z.string().optional(),
  zip: z.string().min(6, "Valid Zip code is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const recruiterRegisterSchema = z.object({
  agencyName: z.string().min(1, "Agency name is required"),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const profileOptimizationSchema = z.object({
  currentJobTitle: z.string().min(1, "Job title is required"),
  experienceLevel: z.string().min(1, "Experience level is required"),
  targetSalary: z.string().min(1, "Target salary is required"),
});

export const cvParsingSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  experienceYears: z.string().min(1, "Experience is required"),
  currentRole: z.string().min(1, "Current role is required"),
  summary: z.string().min(10, "Summary is required"),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type ForgotPasswordStep1Values = z.infer<typeof forgotPasswordStep1Schema>;
export type ForgotPasswordStep2Values = z.infer<typeof forgotPasswordStep2Schema>;
export type CandidateRegisterValues = z.infer<typeof candidateRegisterSchema>;
export type EmployerRegisterValues = z.infer<typeof employerRegisterSchema>;
export type RecruiterRegisterValues = z.infer<typeof recruiterRegisterSchema>;
export type ProfileOptimizationValues = z.infer<typeof profileOptimizationSchema>;
export type CVParsingValues = z.infer<typeof cvParsingSchema>;
