import { z } from "zod";

// Define the category options
const categoryOptions = ["Feature", "UI", "UX", "Enhancement", "Bug"] as const;

// Define the status options with capitalized values
const statusOptions = ["Suggestion", "Planned", "In-Progress", "Live"] as const;

export const feedbackFormSchema = z.object({
  title: z
    .string()
    .min(10, { message: "Title must be at least 10 characters" })
    .max(100, { message: "Title must be at most 100 characters" }),
  category: z.enum(categoryOptions, {
    errorMap: () => ({ message: "Category is required" }),
  }),
  status: z
    .enum(statusOptions, {
      errorMap: () => ({ message: "Status is required" }),
    })
    .optional(),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description must be at most 500 characters" }),
});

// Export the TypeScript type for use in the component
export type FeedbackData = z.infer<typeof feedbackFormSchema>;
