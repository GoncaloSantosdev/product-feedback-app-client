import { useState, useEffect } from "react";
// React Router
import { Link, useNavigate } from "react-router-dom";
// React Hook Form and validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FeedbackData,
  feedbackFormSchema,
} from "../validation/feedbackFormValidation";
// React Query
import { useMutation } from "@tanstack/react-query";
// API functions
import { createFeedbackAPI } from "../services/feedbacks/api";
// Components
import { Button, FormField, LoadingSpinner } from "../components";
// Assets
import ArrowLeft from "../assets/shared/icon-arrow-left.svg";
import iconNewFeedback from "../assets/shared/icon-new-feedback.svg";
// Toast
import { toast } from "react-toastify";

const categoryOptions = ["Feature", "UI", "UX", "Enhancement", "Bug"] as const;
type Category = (typeof categoryOptions)[number];

// Define a specific error type
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const NewFeedback = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FeedbackData>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      category: "Feature",
    },
  });

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Category>("Feature");

  // Update the form data when 'selected' changes
  useEffect(() => {
    setValue("category", selected);
  }, [selected, setValue]);

  const feedbackMutation = useMutation({
    mutationKey: ["createFeedback"],
    mutationFn: createFeedbackAPI,
    onSuccess: () => {
      navigate("/suggestions");
    },
    onError: (error) => {
      toast.error((error as ApiError)?.response?.data?.message);
    },
  });

  const onSubmit = (data: FeedbackData) => {
    feedbackMutation.mutate(data);
  };

  // Mutation states
  const isLoading = feedbackMutation.isPending;

  return (
    <div className="max-w-2xl px-6 mx-auto py-12">
      <Link
        to="/suggestions"
        className="text-[#647196] font-bold flex items-center gap-4"
      >
        <img src={ArrowLeft} alt="Arrow Left" /> Go Back
      </Link>

      <div className="bg-white px-6 py-12 rounded-lg mt-12 relative">
        <div className="absolute top-[-24px]">
          <img src={iconNewFeedback} alt="New Feedback" className="w-14" />
        </div>
        {isLoading && <LoadingSpinner />}
        {/* Display error message if exists */}
        <h3 className="text-lg font-bold text-[#3A4374] mt-8">
          Create New Feedback
        </h3>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          {/* Feedback Title Field */}
          <FormField
            inputTitle="Feedback Title"
            inputDesc="Add a short, descriptive headline"
          >
            <input
              type="text"
              id="title"
              required
              {...register("title")}
              className={`w-full bg-[#F7F8FD] px-4 py-3 rounded mt-3 ${
                errors.title ? "border-red-500" : ""
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </FormField>

          {/* Category Field */}
          <FormField
            inputTitle="Category"
            inputDesc="Choose a category for your feedback"
            containerStyles="mt-10 relative"
          >
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full bg-[#F7F8FD] px-4 py-3 rounded mt-3 flex items-center justify-between cursor-pointer ${
                errors.category ? "border-red-500" : ""
              }`}
            >
              {selected}
              <svg
                className={`w-3 h-3 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {isOpen && (
              <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10">
                <ul className="py-1">
                  {categoryOptions.map((category) => (
                    <li
                      key={category}
                      className={`px-4 py-3 cursor-pointer border-b last:border-b-0 border-gray-200 text-base flex items-center justify-between ${
                        selected === category
                          ? "text-purple-600"
                          : "text-[#647196]"
                      } hover:text-purple-600`}
                      onClick={() => {
                        setSelected(category);
                        setIsOpen(false);
                      }}
                    >
                      {category}
                      {selected === category && (
                        <svg
                          width="13"
                          height="11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 5.233L4.522 9 12 1"
                            stroke="#AD1FEA"
                            strokeWidth="2"
                            fill="none"
                          />
                        </svg>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </FormField>

          {/* Feedback Detail Field */}
          <FormField
            inputTitle="Feedback Detail"
            inputDesc="Include any specific comments on what should be improved, added, etc."
            containerStyles="mt-10"
          >
            <textarea
              required
              {...register("description")}
              className={`w-full bg-[#F7F8FD] px-4 py-3 rounded mt-3 h-[130px] ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </FormField>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-end">
            <Button type="submit">Add Feedback</Button>
            <Button variant="warning" type="reset">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewFeedback;
