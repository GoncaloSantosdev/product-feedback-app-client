import { z } from "zod";

// Define the category options
const categoryOptions = ["Feature", "UI", "UX", "Enhancement", "Bug"] as const;

export const feedbackFormSchema = z.object({
  title: z
    .string()
    .min(10, { message: "Title must be at least 10 characters" })
    .max(100, { message: "Title must be at most 100 characters" }),
  category: z.enum(categoryOptions, {
    errorMap: () => ({ message: "Category is required" }),
  }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(200, { message: "Description must be at most 200 characters" }),
});

// Export the TypeScript type for use in the component
export type FeedbackData = z.infer<typeof feedbackFormSchema>;
