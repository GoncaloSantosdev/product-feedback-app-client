import { Button } from "../components"; // Adjust the import path as needed
import illustration from "../assets/suggestions/illustration-empty.svg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F4FF]">
      {/* Header Section */}
      <div className="text-center px-4">
        <div className="flex items-center justify-center w-full">
          <img
            src={illustration}
            alt="Illustration indicating a page not found"
          />
        </div>

        <h1 className="text-4xl font-bold text-[#3A4374] mt-8">
          Ups, incorrect url.
        </h1>
        <p className="text-[#647196] mt-6 max-w-xl leading-8">
          The page you are looking for does not exist. Please check the URL or
          return to the dashboard.
        </p>
        <div className="flex gap-x-4 justify-center mt-6">
          <Link to={"/suggestions"}>
            <Button variant="primary">Back to dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
