'use client'

import heart from "@/images/heart.png";
import love from "@/images/love.png";
import chat from "@/images/chat.png";

import { useState, useEffect } from "react";
import Comments from "@/components/Comments/image";

type Image = {
  image: {
    id: string;
    post: string;
    imageUrl: string;
    createdAt: string;
    likedCount:number;
    user: {
      username: string;
    };
    comments:[{
      comment: string;
      comment_date: string;
      user:{
        username: string;
      }
    }]
  };
};

export default function Images({ image }: Image) {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [isLiked, setLiked] = useState(false);
  const [count, setCount] = useState(image.likedCount);
  const [baseUrl, setBaseUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch('/config.json')
      .then(res => res.json())
      .then(data => setBaseUrl(data.API_BASE_URL))
      .catch(err => console.error("Error loading config:", err));
  }, []);

  const handleAddComment = () => {
    const token = localStorage.getItem('token');
    if (!baseUrl) return;
    fetch(`${baseUrl}/comments/${image.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to send comment");
        return response.json();
      })
      .catch((err) => console.error(err));
    setComment('')
  };

  const handleLikedComment = async () => {
    const token = localStorage.getItem('token');
    if (!baseUrl) return;
    try {
      const method = isLiked ? 'DELETE' : 'POST';
      const res = await fetch(`${baseUrl}/post/${image.id}/like`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setLiked(!isLiked);
        setCount(data.likedCount);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  return (
    <div className="relative flex flex-col items-center space-y-4">
      {image.imageUrl && baseUrl && (
        <div className="relative">
          <span>{image.user.username}</span>
          <img
            src={`${baseUrl}/${image.imageUrl}`}
            alt="image"
            className="w-96 h-96 object-cover rounded-lg shadow-md"
          />
          <span className="text-xl">{image.post}</span>
          <div className="flex space-x-2 mt-2">
            {isLiked ? (
              <img onClick={handleLikedComment} className="w-8 h-8 cursor-pointer" src={heart.src} alt="love" />
            ) : (
              <img onClick={handleLikedComment} className="w-8 h-8 cursor-pointer" src={love.src} alt="heart" />
            )}
            <span>{count}</span>
            <img
              className="w-8 h-8 cursor-pointer"
              src={chat.src}
              alt="comment"
              onClick={() => setShowComments(true)}
            />
          </div>

          {showComments && (
            <div
              className="fixed inset-0 bg-white/50 z-40 flex items-center justify-center"
              onClick={() => setShowComments(false)}
            >
              <div
                className="bg-white w-146 h-100 rounded-lg shadow-lg p-4 flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="overflow-y-auto max-h-80  space-y-2">
                  <div className="text-sm text-gray-700 space-y-3">
                    {image.comments.map((comment, index) => (
                      <div className="w-full flex items-start space-x-3" key={index}>
                        <div className="w-full bg-gray-100 shadow rounded-2xl px-4 py-2 break-words">
                          <div>
                            <span className="font-bold text-gray-900">{comment?.user.username}</span>
                          </div>
                          <div>
                            <span className="text-gray-800">{comment.comment}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex mt-4">
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-l px-2 py-1 text-sm"
                    placeholder="Write a comment..."
                  />
                  <button
                    onClick={handleAddComment}
                    className="bg-blue-500 text-white px-3 rounded-r text-sm"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
