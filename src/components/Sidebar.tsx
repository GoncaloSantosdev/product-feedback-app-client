// React Icons
import { useState } from "react";
// React Router
import { Link } from "react-router-dom";
// React Icons
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

const categories = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

const roadmapItems = [
  { name: "Planned", count: 2, color: "bg-[#F49F85]" },
  { name: "In-Progress", count: 3, color: "bg-[#AD1FEA]" },
  { name: "Live", count: 1, color: "bg-[#62BCFA]" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header with Burger */}
      <div className="md:hidden relative z-30">
        <div className="bg-gradient-to-r from-[#28A7ED] via-[#A337F6] to-[#E84D70] px-4 py-6 flex items-center justify-between">
          <h1 className="text-white text-base font-bold">Feedback Board</h1>
          <div>
            {isOpen ? (
              <IoCloseSharp
                color="white"
                size={24}
                onClick={() => setIsOpen(!isOpen)}
              />
            ) : (
              <GiHamburgerMenu
                color="white"
                size={24}
                onClick={() => setIsOpen(!isOpen)}
              />
            )}
          </div>
        </div>

        {/* Mobile Sliding Sidebar */}
        <div
          className={`fixed left-0 right-0 top-[72px] bottom-0 bg-black transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-50 z-20" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`fixed right-0 top-[72px] h-[calc(100vh-72px)] w-72 bg-gray-50 transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } z-30`}
        >
          <SidebarContent />
        </div>
      </div>

      {/* Tablet View */}
      <div className="hidden md:flex lg:hidden gap-4 mb-10">
        {/* Gradient Card */}
        <div className="flex-1 h-[178px] rounded-lg bg-gradient-to-r from-[#28A7ED] via-[#A337F6] to-[#E84D70] p-6 flex items-end">
          <div className="text-white">
            <h1 className="font-bold text-xl">Frontend Mentor</h1>
            <p>Feedback Board</p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex-1 h-[178px] bg-white rounded-lg p-6">
          <ul className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <li
                key={category}
                className="bg-[#F2F4FF] text-[#4661E6] px-4 py-1.5 rounded-lg text-sm font-semibold cursor-pointer hover:bg-gray-200"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Roadmap */}
        <div className="flex-1 h-[178px] bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-gray-700">Roadmap</h3>
            <Link to={"/roadmap"} className="text-blue-600 underline text-sm">
              View
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {roadmapItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  <span className="text-gray-500">{item.name}</span>
                </div>
                <span className="font-bold text-gray-600">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block space-y-6 w-[255px]">
        {/* Gradient Card */}
        <div className="h-[150px] rounded-lg bg-gradient-to-r from-[#28A7ED] via-[#A337F6] to-[#E84D70] p-6 flex items-end">
          <div className="text-white">
            <h1 className="font-bold text-xl">Frontend Mentor</h1>
            <p>Feedback Board</p>
          </div>
        </div>

        <SidebarContent />
      </div>
    </>
  );
};

// Separate component for sidebar content to avoid duplication
const SidebarContent = () => {
  return (
    <div className="p-6 md:p-0 flex flex-col gap-6">
      {/* Categories */}
      <div className="bg-white rounded-lg p-6">
        <ul className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <li
              key={category}
              className="bg-[#F2F4FF] text-[#4661E6] px-4 py-1.5 rounded-lg text-sm font-semibold cursor-pointer hover:bg-gray-200"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Roadmap */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-gray-700">Roadmap</h3>
          <Link to={"/roadmap"} className="text-blue-600 underline text-sm">
            View
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {roadmapItems.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                <span className="text-gray-500">{item.name}</span>
              </div>
              <span className="font-bold text-gray-600">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
