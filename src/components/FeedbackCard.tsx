// Components
import { Button } from ".";
// React Router
import { Link } from "react-router-dom";
// Images
import commentsIcon from "../assets/shared/icon-comments.svg";
import arrowUpIcon from "../assets/shared/icon-arrow-up.svg";
import emptyIllustration from "../assets/suggestions/illustration-empty.svg";

type ProductRequest = {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: readonly Comment[];
};

type Comment = {
  id: number;
  content: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
};

interface FeedbackCardProps {
  feedback: ProductRequest;
}

const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  if (!feedback) {
    return (
      <article className="bg-white rounded-lg p-10 mb-4 text-center flex flex-col items-center">
        <img
          src={emptyIllustration}
          alt="No feedback"
          className="mb-10 w-[130px] h-[136px]"
        />
        <h2 className="text-[#3A4374] font-bold text-xl mb-4">
          There is no feedback yet.
        </h2>
        <p className="text-[#647196] mb-6 max-w-md">
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>

        <Button variant="primary">+ Add Feedback</Button>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-lg p-6 mb-4">
      <div className="flex flex-col md:grid md:grid-cols-[auto_1fr_auto] md:gap-x-10 md:items-center">
        <div className="hidden md:block md:order-first">
          <button className="bg-[#F2F4FF] hover:bg-gray-200 rounded-lg px-4 py-3 flex flex-col items-center">
            <img src={arrowUpIcon} alt="Upvote" className="mb-2" />
            <span className="font-bold text-[#3A4374] text-sm">
              {feedback?.upvotes}
            </span>
          </button>
        </div>

        <div>
          <Link to={`/feedback-detail/${feedback.id}`}>
            <h3 className="text-[#3A4374] font-bold mb-2">{feedback?.title}</h3>
          </Link>
          <p className="text-[#647196] mb-2">{feedback?.description}</p>
          <div className="bg-[#F2F4FF] text-[#4661E6] px-4 py-1.5 rounded-lg text-sm font-semibold inline-block capitalize mt-2">
            {feedback?.category}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <img src={commentsIcon} alt="Comments" />
          <span className="font-bold text-slate-600">
            {feedback?.comments?.length || 0}
          </span>
        </div>

        <div className="flex flex-row justify-between items-center mt-4 md:hidden">
          <div>
            <button className="bg-[#F2F4FF] hover:bg-gray-200 rounded-lg px-4 py-3 flex flex-row items-center">
              <img src={arrowUpIcon} alt="Upvote" className="mr-2" />
              <span className="font-bold text-[#3A4374] text-sm">
                {feedback?.upvotes}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <img src={commentsIcon} alt="Comments" />
            <span className="font-bold text-[#3A4374]">
              {feedback?.comments?.length || 0}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeedbackCard;
