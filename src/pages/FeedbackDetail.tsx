// React Router
import { useParams, Link } from "react-router-dom";
// React Query
import { useQuery } from "@tanstack/react-query";
// Components
import {
  Button,
  FeedbackCard,
  FeedbackComments,
  LoadingSpinner,
} from "../components";
// API functions
import { getFeedback } from "../services/feedbacks/api";
// Types
import { FeedbackItem } from "../types";
// Assets
import ArrowLeft from "../assets/shared/icon-arrow-left.svg";

const FeedbackDetail = () => {
  const { feedbackId } = useParams<{ feedbackId: string }>();

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

  if (!feedbackId) {
    return <div>No Feedback Found</div>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !feedback) {
    return <div>Error: {error?.message || "Feedback not found"}</div>;
  }

  return (
    <div className="max-w-4xl px-6 mx-auto py-8">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/suggestions"
          className="text-[#647196] font-bold flex items-center gap-4"
        >
          <img src={ArrowLeft} alt="Arrow Left" /> Go Back
        </Link>
        <Link to={`/edit-feedback/${feedbackId}`}>
          <Button variant="secondary">Edit Feedback</Button>
        </Link>
      </div>

      {/* Feedback Card */}
      <FeedbackCard feedback={feedback} />

      {/* Comments Section */}
      <FeedbackComments comments={feedback.comments} />
    </div>
  );
};

export default FeedbackDetail;
