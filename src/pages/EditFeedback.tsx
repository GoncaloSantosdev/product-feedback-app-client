import { Link, useParams } from "react-router-dom";
import { useState } from "react";
// Data
import { data } from "../data";
// Components
import { Button, FormField } from "../components";
// Assets
import ArrowLeft from "../assets/shared/icon-arrow-left.svg";
import iconEditFeedback from "../assets/shared/icon-edit-feedback.svg";

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

const EditFeedback = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Feature");
  const [selectedStatus, setSelectedStatus] = useState("Suggestion");

  const categoryOptions = ["Feature", "UI", "UX", "Enhancement", "Bug"];
  const statusOptions = ["Suggestion", "Planned", "In-Progress", "Live"];

  const { feedbackId } = useParams();

  if (!feedbackId) {
    return <div>No Feedback Found</div>;
  }
  // Update the feedback variable type
  const feedback = data?.productRequests.find(
    (item) => typeof item.id === "number" && item.id === Number(feedbackId)
  ) as FeedbackItem | undefined;

  return (
    <div className="max-w-2xl px-6 mx-auto py-12">
      <Link
        to="/suggestions"
        className="text-[#647196] font-bold flex items-center gap-4"
      >
        <img src={ArrowLeft} alt="Arrow Left" /> Go Back
      </Link>

      <div className="bg-white p-6 rounded-lg mt-12 relative">
        <div className="absolute top-[-24px]">
          <img src={iconEditFeedback} alt="New Feedback" className="w-14" />
        </div>

        <h3 className="text-lg font-bold text-[#3A4374] mt-8">
          Editing ‘{feedback?.title}‘
        </h3>

        <form className="mt-8">
          <FormField
            inputTitle="Feedback Title"
            inputDesc="Add a short, descriptive headline"
          >
            <input
              type="text"
              className="w-full bg-[#F7F8FD] px-4 py-3 rounded mt-3"
              defaultValue={feedback?.title}
            />
          </FormField>

          <FormField
            inputTitle="Category"
            inputDesc="Choose a category for your feedback"
            containerStyles="mt-10 relative"
          >
            <div
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full bg-[#F7F8FD] px-4 py-3 rounded mt-3 flex items-center justify-between"
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
              <div className="absolute mt-4 w-full bg-white rounded-md shadow-lg z-50">
                <ul className="py-1">
                  {categoryOptions.map((category) => (
                    <li
                      key={category}
                      className={`px-4 py-3 cursor-pointer border-b last:border-b-0 border-gray-200 text-base flex items-center justify-between ${
                        selectedCategory === category
                          ? "text-purple-600"
                          : "text-[#647196]"
                      } hover:text-purple-600`}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsCategoryOpen(false);
                      }}
                    >
                      {category}
                      {selectedCategory === category && (
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
          </FormField>

          <FormField
            inputTitle="Update Status"
            inputDesc="Change feedback state"
            containerStyles="mt-10 relative"
          >
            <div
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              className="w-full bg-[#F7F8FD] px-4 py-3 rounded mt-3 flex items-center justify-between"
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
              <div className="absolute mt-4 w-full bg-white rounded-md shadow-lg">
                <ul className="py-1">
                  {statusOptions.map((status) => (
                    <li
                      key={status}
                      className={`px-4 py-3 cursor-pointer border-b last:border-b-0 border-gray-200 text-base flex items-center justify-between ${
                        selectedStatus === status
                          ? "text-purple-600"
                          : "text-[#647196]"
                      } hover:text-purple-600`}
                      onClick={() => {
                        setSelectedStatus(status);
                        setIsStatusOpen(false);
                      }}
                    >
                      {status}
                      {selectedStatus === status && (
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
          </FormField>

          <FormField
            inputTitle="Feedback Detail"
            inputDesc="Include any specific comments on what should be improved, added, etc."
            containerStyles="mt-10"
          >
            <textarea
              className="w-full bg-[#F7F8FD] px-4 py-3 rounded mt-3 h-[130px]"
              defaultValue={feedback?.description}
            />
          </FormField>

          <div className="mt-10 flex w-full">
            <Button variant="danger">Delete</Button>

            <div className="flex justify-end w-full gap-x-4">
              <Button variant="warning">Cancel</Button>
              <Button>Add Feedback</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFeedback;
