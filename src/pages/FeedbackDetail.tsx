import { useParams, Link } from "react-router-dom";
// Components
import { Button, FeedbackCard, FeedbackComments } from "../components";
// Data
import { data } from "../data";
// Assets
import ArrowLeft from "../assets/shared/icon-arrow-left.svg";

type Comment = {
  id: number;
  content: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
};

type FeedbackItem = {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments: Array<Comment>;
};

const FeedbackDetail = () => {
  const { feedbackId } = useParams();

  if (!feedbackId) {
    return <div>No Feedback Found</div>;
  }

  // Update the feedback variable type
  const feedback = data?.productRequests.find(
    (item) => typeof item.id === "number" && item.id === Number(feedbackId)
  ) as FeedbackItem | undefined;

  return (
    <div className="max-w-4xl px-6 mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/suggestions"
          className="text-[#647196] font-bold flex items-center gap-4"
        >
          <img src={ArrowLeft} alt="Arrow Left" /> Go Back
        </Link>
        <Button variant="secondary">Edit Feedback</Button>
      </div>

      {feedback && (
        <>
          <FeedbackCard feedback={feedback} />
          <FeedbackComments comments={feedback.comments} />
        </>
      )}
    </div>
  );
};

export default FeedbackDetail;
