/* eslint-disable @next/next/no-img-element */
import { Comment, CommentBody, Tweet } from "@/typing";
import React, { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import {
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ArrowsRightLeftIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { fetchComments } from "@/utils/fetchComments";

interface Props {
  tweet: Tweet;
}

function Tweet({ tweet }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { data: session } = useSession();

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const postComment = async () => {
    const commentInfo: CommentBody = {
      comment: input,
      username: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || "https://links.papareact.com/gll",
      tweetId: tweet._id,
    };

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(commentInfo),
      method: "POST",
    });

    const json = await result.json();

    const newComments = await fetchComments(tweet._id);
    setComments(newComments);

    return json;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postComment();

    setInput("");
    setCommentBoxVisible(false);
  };

  return (
    <div className="flex flex-col space-x-3 border-y border-gray-200 p-5">
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImg}
          alt=""
        />

        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, "").toLowerCase()}
            </p>

            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>
          <p className="pt-1">{tweet.text}</p>
          {tweet.image && (
            <img
              src={tweet.image}
              alt=""
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <div
          onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
          className="flex cursor-pointer items-center space-x-3 text-gray-400"
        >
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowsRightLeftIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowUpTrayIcon className="h-5 w-5" />
        </div>
      </div>

      {commentBoxVisible && (
        <form onSubmit={handleSubmit} className="mt-3 flex space-x-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg bg-gray-200 p-2 outline-none"
            type="text"
            placeholder="Write a comment...."
          />
          <button
            disabled={!input}
            type="submit"
            className="text-twitter disabled:text-gray-300"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-200 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/40" />
              <img
                src={comment.profileImg}
                className="mt-2 h-7 w-7 rounded-full object-cover"
                alt=""
              />
              <div>
                <div className="flex items-center space-x-1">
                  <p>{comment.username}</p>
                  <p>@{comment.username.replace(/\s+/g, "").toLowerCase()}</p>

                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tweet;
