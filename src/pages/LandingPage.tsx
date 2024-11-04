import { Button } from "../components"; // Adjust the import path as needed
import illustration from "../assets/suggestions/illustration-empty.svg";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F4FF]">
      {/* Header Section */}
      <div className="text-center px-4">
        <div className="flex items-center justify-center w-full">
          <img src={illustration} alt="App Illustration" />
        </div>

        <h1 className="text-4xl font-bold text-[#3A4374] mt-8">
          Welcome to Feedback Board App
        </h1>
        <p className="text-[#647196] mt-6 max-w-xl leading-8">
          This portfolio app is built with the{" "}
          <span className="font-bold">MERN Stack :)</span> <br />
          <span className="font-bold">Frontend:</span> React, Tailwind CSS,
          React Query, Axios, React Hook Form, and Zod. <br />
          <span className="font-bold">Backend:</span> Node.js, Express.js, and
          MongoDB.
          <br />
          <span className="font-bold">Others:</span> Clerk.
        </p>
        <div className="flex gap-x-4 justify-center mt-6">
          <Button variant="primary">Log in with Google</Button>
          <Button variant="secondary">Demo User</Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
