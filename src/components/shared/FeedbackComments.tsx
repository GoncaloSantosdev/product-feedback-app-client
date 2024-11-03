import { Button } from "../../components";
import { useState } from "react";

interface Comment {
  id: number;
  content: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
  replies?: Comment[];
}

interface FeedbackCommentsProps {
  comments?: Comment[];
}

const FeedbackComments = ({ comments = [] }: FeedbackCommentsProps) => {
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>(
    {}
  );

  const handleReplyChange = (id: number, value: string) => {
    setReplyContent((prev) => ({ ...prev, [id]: value }));
  };

  const handlePostReply = (id: number) => {
    // Clear the reply content after posting
    setReplyContent((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="space-y-6">
      {/* Comments Count */}
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-bold text-[#3A4374] mb-6">
          {comments.length} Comments
        </h3>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border-b border-gray-200 pb-6 last:border-0"
            >
              <div className="flex gap-4">
                <img
                  src={comment.user.image}
                  alt={comment.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-[#3A4374]">
                        {comment.user.name}
                      </h4>
                      <p className="text-[#647196]">@{comment.user.username}</p>
                    </div>
                    <button
                      className="text-blue-600 font-semibold"
                      onClick={() =>
                        handleReplyChange(
                          comment.id,
                          replyContent[comment.id] || ""
                        )
                      }
                    >
                      Reply
                    </button>
                  </div>
                  <p className="text-[#647196] mt-4">{comment.content}</p>
                  {replyContent[comment.id] !== undefined && (
                    <div className="mt-4">
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Type your reply here"
                        value={replyContent[comment.id]}
                        onChange={(e) =>
                          handleReplyChange(comment.id, e.target.value)
                        }
                        maxLength={250}
                      />
                      <div className="flex justify-end mt-2">
                        <Button
                          variant="primary"
                          onClick={() => handlePostReply(comment.id)}
                        >
                          Post Reply
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Comment Box */}
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-bold text-[#3A4374] mb-6">Add Comment</h3>
        <textarea
          className="w-full p-4 rounded-lg border border-gray-300 h-20 resize-none focus:outline-none focus:border-blue-600"
          placeholder="Type your comment here"
          maxLength={250}
        />
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#647196]">250 Characters left</span>
          <Button variant="primary">Post Comment</Button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackComments;
