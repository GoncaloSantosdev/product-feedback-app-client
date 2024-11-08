import { useState } from "react";
import { Link } from "react-router-dom";
// Clerk
import { UserButton, useUser } from "@clerk/clerk-react";
// Components
import { Button } from "./";
// Images
import lightbulbIcon from "../assets/suggestions/icon-suggestions.svg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Most Upvotes");
  const { isSignedIn } = useUser();

  const sortOptions = [
    "Most Upvotes",
    "Least Upvotes",
    "Most Comments",
    "Least Comments",
  ];

  return (
    <div className="bg-[#373F68] p-4 md:p-6 flex items-center justify-between md:rounded-md">
      <div className="flex items-center gap-x-12">
        <div className="hidden md:flex items-center gap-x-4">
          <img src={lightbulbIcon} alt="Lightbulb icon" />
          <span className="text-white font-bold">6 Suggestions</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-sm font-bold flex items-center gap-2"
          >
            <span className="text-white/75 font-normal">Sort by:</span>
            {selected}
            <svg
              className={`w-3 h-3 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute top-full mt-4 w-48 bg-white rounded-md shadow-lg">
              <ul className="py-1">
                {sortOptions.map((option) => (
                  <li
                    key={option}
                    className={`px-4 py-3 cursor-pointer border-b last:border-b-0 border-gray-200 text-base flex items-center justify-between ${
                      selected === option ? "text-purple-600" : "text-[#647196]"
                    } hover:text-purple-600`}
                    onClick={() => {
                      setSelected(option);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                    {selected === option && (
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
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <Link to={"/new-feedback"}>
          <Button variant="primary">+ Add Feedback</Button>
        </Link>
        {isSignedIn && <UserButton />}
      </div>
    </div>
  );
};

export default Header;
