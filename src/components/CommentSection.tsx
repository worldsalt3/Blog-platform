import { useCreateCommentsMutation } from "@/apis/BlogQuery";
import React, { useState } from "react";

const CommentSection = ({ params }: { params: { id: string } }) => {
  const [message, setMessage] = useState<string>("");
  const [createCommentMutation] = useCreateCommentsMutation();

  const submitComment = async () => {
    if (message?.length < 2) {
      return;
    }

    let payload = {
      message,
      owner: "60d0fe4f5311236168a109cd",
      post: params?.id,
    };
    try {
      const res = await createCommentMutation(payload).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="self-start mt-8">
      <h3 className="text-[24px] font-medium  mb-4">Add Comments</h3>
      <textarea
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        cols={50}
        rows={7}
        className="border border-[#292d3233] rounded-[16px] p-2 block w-full"
      ></textarea>
      <button
        onClick={submitComment}
        className="bg-[#0c2e61] text-[#fff] mt-4 p-2 rounded-[8px]"
      >
        comment
      </button>
    </section>
  );
};

export default CommentSection;
