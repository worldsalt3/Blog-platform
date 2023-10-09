import React from "react";

const CommentSection = () => {
  return (
    <section className="self-start mt-8">
      <h3 className="text-[24px] font-medium  mb-4">Add Comments</h3>
      <textarea
        name=""
        id=""
        cols={50}
        rows={7}
        className="border border-[#292d3233] rounded-[16px] p-2 block w-full"
      ></textarea>
      <button className="bg-[#0c2e61] text-[#fff] mt-4 p-2 rounded-[8px]">
        comment
      </button>
    </section>
  );
};

export default CommentSection;
