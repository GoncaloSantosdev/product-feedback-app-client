import { Link } from "react-router-dom";
import { FeedbackItem } from "../types";
// Images
import commentsIcon from "../assets/shared/icon-comments.svg";
import arrowUpIcon from "../assets/shared/icon-arrow-up.svg";

// Define props interface
interface FeedbackCardProps {
  feedback: FeedbackItem;
  mobile?: boolean;
  inRoadmap?: boolean;
}

const FeedbackCard = ({
  feedback,
  mobile = false,
  inRoadmap = false,
}: FeedbackCardProps) => {
  // Map status to color
  const statusColors: Record<string, string> = {
    Suggestion: "#62BCFA",
    Planned: "#F49F85",
    "In-Progress": "#AD1FEA",
    Live: "#62BCFA",
  };

  const borderTopColor = inRoadmap
    ? statusColors[feedback.status] || "#000"
    : "transparent";

  return (
    <article
      className={`bg-white rounded-lg p-6 mb-4 ${
        inRoadmap ? "border-t-4" : ""
      }`}
      style={{ borderTopColor }}
    >
      {/* Status Indicator (Optional) */}
      {inRoadmap && (
        <div className="flex items-center mb-4">
          <span
            className="w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: borderTopColor }}
          ></span>
          <span className="text-sm font-semibold text-[#647196] capitalize">
            {feedback.status}
          </span>
        </div>
      )}

      <div
        className={
          mobile
            ? "flex flex-col"
            : "flex flex-col md:grid md:grid-cols-[auto_1fr_auto] md:gap-x-10 md:items-center"
        }
      >
        {/* Desktop Upvote Button */}
        {!mobile && (
          <div className="hidden md:block md:order-first">
            <button className="bg-[#F2F4FF] hover:bg-gray-200 rounded-lg px-4 py-3 flex flex-col items-center">
              <img src={arrowUpIcon} alt="Upvote" className="mb-2" />
              <span className="font-bold text-[#3A4374] text-sm">
                {feedback.upvotes}
              </span>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="w-full">
          <Link to={`/feedback-detail/${feedback._id}`}>
            <h3 className="text-[#3A4374] font-bold mb-2">{feedback.title}</h3>
          </Link>
          <p className="text-[#647196] mb-2">{feedback.description}</p>
          <div className="bg-[#F2F4FF] text-[#4661E6] px-4 py-1.5 rounded-lg text-sm font-semibold inline-block capitalize mt-2">
            {feedback.category}
          </div>
        </div>

        {/* Desktop Comments */}
        {!mobile && (
          <div className="hidden md:flex items-center gap-2">
            <img src={commentsIcon} alt="Comments" />
            <span className="font-bold text-slate-600">
              {feedback.comments?.length || 0}
            </span>
          </div>
        )}
      </div>

      {/* Mobile Upvote and Comments */}
      {mobile && (
        <div className="flex flex-row justify-between items-center mt-4">
          {/* Mobile Upvote Button */}
          <div>
            <button className="bg-[#F2F4FF] hover:bg-gray-200 rounded-lg px-4 py-3 flex flex-row items-center">
              <img src={arrowUpIcon} alt="Upvote" className="mr-2" />
              <span className="font-bold text-[#3A4374] text-sm">
                {feedback.upvotes}
              </span>
            </button>
          </div>

          {/* Mobile Comments */}
          <div className="flex items-center gap-2">
            <img src={commentsIcon} alt="Comments" />
            <span className="font-bold text-[#3A4374]">
              {feedback.comments?.length || 0}
            </span>
          </div>
        </div>
      )}
    </article>
  );
};

export default FeedbackCard;
