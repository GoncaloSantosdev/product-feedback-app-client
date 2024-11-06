// types.ts
export type FeedbackCategory = "Feature" | "UI" | "UX" | "Enhancement" | "Bug";
export type FeedbackStatus = "Suggestion" | "Planned" | "In-Progress" | "Live";

// User Type
export type User = {
  image: string;
  name: string;
  username: string;
};

// Reply Type
export type Reply = {
  _id: string;
  content: string;
  replyingTo: string;
  user: User;
};

// Comment Type
export type Comment = {
  _id: string;
  content: string;
  user: User;
  replies?: Reply[];
};

// Feedback Item Type
export type FeedbackItem = {
  _id: string;
  title: string;
  category: FeedbackCategory;
  upvotes: number;
  status: FeedbackStatus;
  description: string;
  comments?: Comment[];
};
