import { Button } from "../../components";
import { useState } from "react";
import { Comment } from "../../types"; // Adjust the import path as needed

interface FeedbackCommentsProps {
  comments?: Comment[];
}

const FeedbackComments = ({ comments = [] }: FeedbackCommentsProps) => {
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>(
    {}
  );

  const handleReplyChange = (id: string, value: string) => {
    setReplyContent((prev) => ({ ...prev, [id]: value }));
  };

  const handlePostReply = (id: string) => {
    // Handle post reply logic
    setReplyContent((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="space-y-6">
      {/* Comments Count and List */}
      {comments.length > 0 && (
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg font-bold text-[#3A4374] mb-6">
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </h3>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div
                key={comment._id}
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
                        <p className="text-[#647196]">
                          @{comment.user.username}
                        </p>
                      </div>
                      <button
                        className="text-blue-600 font-semibold"
                        onClick={() =>
                          handleReplyChange(
                            comment._id,
                            replyContent[comment._id] || ""
                          )
                        }
                      >
                        Reply
                      </button>
                    </div>
                    <p className="text-[#647196] mt-4">{comment.content}</p>
                    {replyContent[comment._id] !== undefined && (
                      <div className="mt-4">
                        <textarea
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          placeholder="Type your reply here"
                          value={replyContent[comment._id]}
                          onChange={(e) =>
                            handleReplyChange(comment._id, e.target.value)
                          }
                          maxLength={250}
                        />
                        <div className="flex justify-end mt-2">
                          <Button
                            variant="primary"
                            onClick={() => handlePostReply(comment._id)}
                          >
                            Post Reply
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Display Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-6 ml-10 space-y-6">
                        {comment.replies.map((reply) => (
                          <div key={reply._id} className="flex gap-4">
                            <img
                              src={reply.user.image}
                              alt={reply.user.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-bold text-[#3A4374]">
                                    {reply.user.name}
                                  </h4>
                                  <p className="text-[#647196]">
                                    @{reply.user.username}
                                  </p>
                                </div>
                                <button
                                  className="text-blue-600 font-semibold"
                                  onClick={() =>
                                    handleReplyChange(
                                      reply._id,
                                      replyContent[reply._id] || ""
                                    )
                                  }
                                >
                                  Reply
                                </button>
                              </div>
                              <p className="text-[#647196] mt-4">
                                <span className="text-purple-600 font-semibold">
                                  @{reply.replyingTo}
                                </span>{" "}
                                {reply.content}
                              </p>
                              {replyContent[reply._id] !== undefined && (
                                <div className="mt-4">
                                  <textarea
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    placeholder="Type your reply here"
                                    value={replyContent[reply._id]}
                                    onChange={(e) =>
                                      handleReplyChange(
                                        reply._id,
                                        e.target.value
                                      )
                                    }
                                    maxLength={250}
                                  />
                                  <div className="flex justify-end mt-2">
                                    <Button
                                      variant="primary"
                                      onClick={() => handlePostReply(reply._id)}
                                    >
                                      Post Reply
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
