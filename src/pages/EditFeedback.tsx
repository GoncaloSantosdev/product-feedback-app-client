import { useState, useEffect } from "react";
// React Router
import { Link, useParams, useNavigate } from "react-router-dom";
// React Query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// React Hook Form and validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FeedbackData,
  feedbackFormSchema,
} from "../validation/feedbackFormValidation";
// API functions
import {
  getFeedback,
  updateFeedback,
  deleteFeedback,
} from "../services/feedbacks/api";
// Components
import { Button, FormField } from "../components";
// Types
import { FeedbackItem } from "../types";
// Assets
import ArrowLeft from "../assets/shared/icon-arrow-left.svg";
import iconEditFeedback from "../assets/shared/icon-edit-feedback.svg";

const EditFeedback = () => {
  const { feedbackId } = useParams<{ feedbackId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch the existing feedback data
  const {
    isError,
    isLoading,
    data: feedback,
    error,
  } = useQuery<FeedbackItem, Error>({
    queryKey: ["getFeedback", feedbackId],
    queryFn: () => getFeedback(feedbackId!),
    enabled: !!feedbackId,
  });

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FeedbackData>({
    resolver: zodResolver(feedbackFormSchema),
  });

  // Populate form fields with existing data
  useEffect(() => {
    if (feedback) {
      setValue("title", feedback.title);
      setValue("category", feedback.category as FeedbackData["category"]);
      setValue("status", feedback.status as FeedbackData["status"]);
      setValue("description", feedback.description);
    }
  }, [feedback, setValue]);

  // Watch form values
  const selectedCategory = watch("category");
  const selectedStatus = watch("status");

  // Category and Status options with capitalized status values
  const categoryOptions = [
    { value: "Feature", label: "Feature" },
    { value: "UI", label: "UI" },
    { value: "UX", label: "UX" },
    { value: "Enhancement", label: "Enhancement" },
    { value: "Bug", label: "Bug" },
  ] as const;

  const statusOptions = [
    { value: "Suggestion", label: "Suggestion" },
    { value: "Planned", label: "Planned" },
    { value: "In-Progress", label: "In-Progress" },
    { value: "Live", label: "Live" },
  ] as const;

  // Mutation for updating feedback
  const updateFeedbackMutation = useMutation({
    mutationKey: ["updateFeedback", feedbackId],
    mutationFn: (data: FeedbackData) => updateFeedback(feedbackId!, data),
    onSuccess: () => {
      navigate(`/feedback-detail/${feedbackId}`);
    },
    onError: (error) => {
      console.error("Update failed", error);
    },
  });

  // Mutation for deleting feedback
  const deleteFeedbackMutation = useMutation({
    mutationKey: ["deleteFeedback", feedbackId],
    mutationFn: () => deleteFeedback(feedbackId!),
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["getFeedbacks"] });
      navigate("/suggestions");
    },
    onError: (error) => {
      console.error("Delete failed", error);
    },
  });

  // Handle form submission
  const onSubmit = (data: FeedbackData) => {
    updateFeedbackMutation.mutate(data);
  };

  // Handle delete action
  const handleDelete = () => {
    // Optional: Add a confirmation dialog
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      deleteFeedbackMutation.mutate();
    }
  };

  // Handle loading and error states
  if (!feedbackId) {
    return <div>No Feedback Found</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !feedback) {
    return <div>Error: {error?.message || "Feedback not found"}</div>;
  }

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
          <img src={iconEditFeedback} alt="Edit Feedback" className="w-14" />
        </div>

        <h3 className="text-lg font-bold text-[#3A4374] mt-8">
          Editing ‘{feedback.title}‘
        </h3>

        {/* Display mutation status */}
        {updateFeedbackMutation.isError && (
          <p className="text-red-500">
            Error updating feedback:{" "}
            {updateFeedbackMutation.error instanceof Error
              ? updateFeedbackMutation.error.message
              : "An error occurred"}
          </p>
        )}

        {updateFeedbackMutation.isPending && <p>Updating feedback...</p>}

        {updateFeedbackMutation.isSuccess && (
          <p className="text-green-500">Feedback updated successfully!</p>
        )}

        {deleteFeedbackMutation.isError && (
          <p className="text-red-500">
            Error deleting feedback:{" "}
            {deleteFeedbackMutation.error instanceof Error
              ? deleteFeedbackMutation.error.message
              : "An error occurred"}
          </p>
        )}

        {deleteFeedbackMutation.isPending && <p>Deleting feedback...</p>}

        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          {/* Feedback Title Field */}
          <FormField
            inputTitle="Feedback Title"
            inputDesc="Add a short, descriptive headline"
          >
            <input
              type="text"
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
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full bg-[#F7F8FD] px-4 py-3 rounded mt-3 flex items-center justify-between cursor-pointer"
            >
              {selectedCategory}
              <svg
                className={`w-3 h-3 transition-transform ${
                  isCategoryOpen ? "rotate-180" : ""
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
            {isCategoryOpen && (
              <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10">
                <ul className="py-1">
                  {categoryOptions.map((category) => (
                    <li
                      key={category.value}
                      className={`px-4 py-3 cursor-pointer border-b last:border-b-0 border-gray-200 text-base flex items-center justify-between ${
                        selectedCategory === category.value
                          ? "text-purple-600"
                          : "text-[#647196]"
                      } hover:text-purple-600`}
                      onClick={() => {
                        setValue("category", category.value);
                        setIsCategoryOpen(false);
                      }}
                    >
                      {category.label}
                      {selectedCategory === category.value && (
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

          {/* Status Field */}
          <FormField
            inputTitle="Update Status"
            inputDesc="Change feedback state"
            containerStyles="mt-10 relative"
          >
            <div
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              className="w-full bg-[#F7F8FD] px-4 py-3 rounded mt-3 flex items-center justify-between cursor-pointer"
            >
              {selectedStatus}
              <svg
                className={`w-3 h-3 transition-transform ${
                  isStatusOpen ? "rotate-180" : ""
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
            {isStatusOpen && (
              <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10">
                <ul className="py-1">
                  {statusOptions.map((status) => (
                    <li
                      key={status.value}
                      className={`px-4 py-3 cursor-pointer border-b last:border-b-0 border-gray-200 text-base flex items-center justify-between ${
                        selectedStatus === status.value
                          ? "text-purple-600"
                          : "text-[#647196]"
                      } hover:text-purple-600`}
                      onClick={() => {
                        setValue("status", status.value);
                        setIsStatusOpen(false);
                      }}
                    >
                      {status.label}
                      {selectedStatus === status.value && (
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
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {errors.status.message}
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
          <div className="mt-8 flex flex-col md:flex-row w-full gap-y-4">
            <Button variant="danger" type="button" onClick={handleDelete}>
              Delete
            </Button>

            <div className="flex flex-col md:flex-row justify-end w-full gap-x-4 gap-y-4">
              <Button
                variant="warning"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFeedback;
