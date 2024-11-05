// types.ts

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
  category: string;
  upvotes: number;
  status: "suggestion" | "planned" | "in-progress" | "live";
  description: string;
  comments?: Comment[];
};
