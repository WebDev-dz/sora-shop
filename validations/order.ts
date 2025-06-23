import { z } from "zod";



export const orderFormSchema = z.object({
    full_name: z.string()
      .min(1, "Full name is required")
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be less than 100 characters"),
  
    phone: z.string()
      .min(1, "Phone number is required")
      .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number")
      .min(10, "Phone number must be at least 10 digits"),
  
    quantity: z.number()
      .min(1, "Quantity must be at least 1")
      .max(10, "Maximum quantity is 10")
      .int("Quantity must be a whole number"),
  
    wilaya: z.string().min(1, "Please select a wilaya"),
  
    municipality: z.string().min(1, "Please select a municipality"),
  
    address: z.string().optional(),
  });
  
export type OrderFormData = z.infer<typeof orderFormSchema>;
  