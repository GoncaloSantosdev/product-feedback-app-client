import { FeedbackCard, Header, Sidebar } from "../components";
// React Query & API
import { useQuery } from "@tanstack/react-query";
import { getFeedbacksAPI } from "../services/feedbacks/api";
import { FeedbackItem } from "../types";
import { Button } from "../components";
import emptyIllustration from "../assets/suggestions/illustration-empty.svg";

const Suggestions = () => {
  const {
    isError,
    isLoading,
    data: feedbacks,
    error,
  } = useQuery<FeedbackItem[], Error>({
    queryKey: ["getFeedbacks"],
    queryFn: getFeedbacksAPI,
  });

  return (
    <div className="md:p-10 lg:flex lg:gap-x-8 xl:gap-x-0 max-w-7xl mx-auto h-screen">
      <div className="lg:sticky lg:top-10 lg:h-fit lg:w-1/4">
        <Sidebar />
      </div>

      <div className="lg:flex-1 lg:flex lg:flex-col">
        <div className="lg:sticky lg:top-10 lg:z-10">
          <Header />
        </div>

        <div className="lg:overflow-y-auto lg:flex-1 mt-8 mx-4 md:mx-0 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent hover:scrollbar-thumb-slate-400">
          {isLoading && <p>Loading...</p>}
          {isError && <p>{error?.message}</p>}

          {feedbacks && feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <FeedbackCard feedback={feedback} key={feedback._id} />
            ))
          ) : (
            <div className="bg-white rounded-lg p-10 mb-4 text-center flex flex-col items-center">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
