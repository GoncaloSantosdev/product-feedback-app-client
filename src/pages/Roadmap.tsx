import { useState } from "react";
import { Link } from "react-router-dom";
// Components
import { Button, FeedbackCard } from "../components";
// Drag and Drop
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
// Assets
import ArrowLeft from "../assets/shared/icon-arrow-left.svg";

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

type ColumnType = {
  name: string;
  items: ProductRequest[];
};

const Roadmap = () => {
  // Initial feedback data
  const initialData: Record<string, ColumnType> = {
    Planned: {
      name: "Planned",
      items: [
        {
          id: 1,
          title: "New Feature Request",
          category: "Feature",
          upvotes: 10,
          status: "Planned",
          description: "A detailed description of the new feature.",
          comments: [],
        },
        {
          id: 2,
          title: "Improved UI Design",
          category: "Enhancement",
          upvotes: 5,
          status: "Planned",
          description: "Suggestions for a more user-friendly interface.",
          comments: [],
        },
        {
          id: 4,
          title: "Accessibility Improvements",
          category: "Enhancement",
          upvotes: 3,
          status: "Planned",
          description: "Enhancing accessibility features for better usability.",
          comments: [],
        },
      ],
    },
    "In-Progress": {
      name: "In-Progress",
      items: [
        {
          id: 3,
          title: "Bug Fix: Login Issue",
          category: "Bug",
          upvotes: 8,
          status: "In-Progress",
          description: "Fixing the login issue that some users are facing.",
          comments: [],
        },
        {
          id: 5,
          title: "Performance Optimization",
          category: "Enhancement",
          upvotes: 7,
          status: "In-Progress",
          description: "Optimizing the app for better performance.",
          comments: [],
        },
      ],
    },
    Live: {
      name: "Live",
      items: [],
    },
  };

  const [columns, setColumns] = useState(initialData);
  const [activeTab, setActiveTab] = useState("Planned");

  // Handle drag end
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If there's no destination, do nothing
    if (!destination) return;

    // If the item is dropped in the same place, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = Array.from(sourceColumn.items);
    const destItems = Array.from(destColumn.items);
    const [movedItem] = sourceItems.splice(source.index, 1);

    movedItem.status = destColumn.name; // Update the status of the moved item

    destItems.splice(destination.index, 0, movedItem);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  };

  // Tab Labels, Descriptions, and Colors
  const tabData = {
    Planned: {
      label: "Planned",
      description: "Ideas prioritized for research",
      color: "#F49F85",
    },
    "In-Progress": {
      label: "In-Progress",
      description: "Currently being developed",
      color: "#AD1FEA",
    },
    Live: {
      label: "Live",
      description: "Released features",
      color: "#62BCFA",
    },
  };

  return (
    <div className="md:px-12 md:pt-10 max-w-7xl mx-auto">
      <div className="bg-[#373F68] w-full px-6 md:px-12 py-8 md:rounded flex items-center justify-between">
        <div>
          <Link
            to="/suggestions"
            className="text-white font-bold flex items-center gap-4"
          >
            <img src={ArrowLeft} alt="Arrow Left" /> Go Back
          </Link>

          <h2 className="text-white text-xl font-bold mt-2">Roadmap</h2>
        </div>

        <Button>+ Add Feedback</Button>
      </div>

      {/* Tabs for Mobile Screens */}
      <div className="md:hidden mt-6">
        <div className="relative flex justify-between border-b border-[#8C92B3] rounded-t-md">
          {Object.keys(tabData).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative flex-1 text-center py-2 font-bold ${
                activeTab === key ? "text-[#3A4374]" : "text-[#647196]"
              }`}
            >
              {tabData[key as keyof typeof tabData].label}
              {activeTab === key && (
                <span
                  className="absolute left-0 right-0 h-1"
                  style={{
                    backgroundColor: tabData[key as keyof typeof tabData].color,
                    bottom: "-1px",
                  }}
                ></span>
              )}
            </button>
          ))}
        </div>
        {/* Title and Description */}
        <div className="mt-8 px-4">
          <h3 className="text-[#3A4374] font-bold text-lg">
            {tabData[activeTab as keyof typeof tabData].label} (
            {columns[activeTab as keyof typeof columns].items.length})
          </h3>
          <p className="text-[#647196] mt-2">
            {tabData[activeTab as keyof typeof tabData].description}
          </p>
        </div>
      </div>

      {/* Desktop Columns with Drag and Drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="hidden md:flex mt-8 justify-between gap-x-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <div className="w-1/3" key={columnId}>
              {/* Column Header */}
              <h3 className="text-[#3A4374] font-bold">
                {column.name} ({column.items.length})
              </h3>
              <p className="text-[#647196] mt-2">
                {tabData[columnId as keyof typeof tabData].description}
              </p>

              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div
                    className="mt-4"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {column.items.map((feedback, index) => (
                      <Draggable
                        key={feedback.id}
                        draggableId={`${feedback.id}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-4 ${
                              snapshot.isDragging ? "opacity-80" : "opacity-100"
                            }`}
                          >
                            <FeedbackCard
                              feedback={feedback}
                              mobile={true}
                              inRoadmap={true}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Mobile Tabs Content without Drag and Drop */}
      <div className="md:hidden mt-4 px-4">
        <div className="mt-4">
          {columns[activeTab].items.map((feedback) => (
            <FeedbackCard
              key={feedback.id}
              feedback={feedback}
              mobile={true}
              inRoadmap={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
