import { Header, Sidebar } from "../components";

const Suggestions = () => {
  return (
    <section className="md:p-10 lg:flex lg:gap-x-8 xl:gap-x-0 max-w-7xl mx-auto">
      {/* Sidebar wrapper */}
      <div className="lg:w-1/4">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="lg:flex-1">
        <Header />
        <div>Feedback Cards</div>
      </div>
    </section>
  );
};

export default Suggestions;
