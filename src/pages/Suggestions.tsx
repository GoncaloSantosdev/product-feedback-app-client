import { FeedbackCard, Header, Sidebar } from "../components";
import { data } from "../data";

const Suggestions = () => {
  return (
    <section className="md:p-10 lg:flex lg:gap-x-8 xl:gap-x-0 max-w-7xl mx-auto h-screen">
      <div className="lg:sticky lg:top-10 lg:h-fit lg:w-1/4">
        <Sidebar />
      </div>

      <div className="lg:flex-1 lg:flex lg:flex-col">
        <div className="lg:sticky lg:top-10 lg:z-10">
          <Header />
        </div>

        <div className="lg:overflow-y-auto lg:flex-1 mt-8 mx-4 md:mx-0 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent hover:scrollbar-thumb-slate-400">
          {data?.productRequests?.map((feedback) => (
            <FeedbackCard feedback={feedback} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Suggestions;
