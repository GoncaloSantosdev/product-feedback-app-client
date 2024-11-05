import { useParams, Link } from "react-router-dom";
// Components
import { Button, FeedbackCard, FeedbackComments } from "../components";
// Assets
import ArrowLeft from "../assets/shared/icon-arrow-left.svg";
import { useQuery } from "@tanstack/react-query";
import { getFeedback } from "../services/feedbacks/api";
import { FeedbackItem } from "../types";

const FeedbackDetail = () => {
  const { feedbackId } = useParams<{ feedbackId: string }>();

  // Move useQuery to the top level
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
    return <div>Loading...</div>;
  }

  if (isError || !feedback) {
    return <div>Error: {error?.message || "Feedback not found"}</div>;
  }

  return (
    <div className="max-w-4xl px-6 mx-auto py-8">
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

      <FeedbackCard feedback={feedback} />
      <FeedbackComments comments={feedback.comments} />
    </div>
  );
};

export default FeedbackDetail;
