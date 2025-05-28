
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});
export type LoginFormData = z.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // path of error
});
export type SignupFormData = z.infer<typeof SignupSchema>;

export const AddServiceSchema = z.object({
  name: z.string().min(1, { message: "Service name is required." }).max(50, { message: "Name cannot exceed 50 characters."}),
  url: z.string().url({ message: "Invalid URL format." }),
});
export type AddServiceFormData = z.infer<typeof AddServiceSchema>;

export interface MonitoredService extends AddServiceFormData {
  id: string;
  status: 'Online' | 'Offline' | 'Checking';
  lastChecked: Date | null;
}
