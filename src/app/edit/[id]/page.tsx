"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";
import {
  useGetPostDetailsQuery,
  useUpdatePostMutation,
} from "@/apis/BlogQuery";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const Edit = () => {
  const params: any = useParams();

  const { data: postDetails } = useGetPostDetailsQuery(params);

  console.log(postDetails);

  const [text, setText] = useState<string>(postDetails?.text);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const router = useRouter();

  const handleEditorChange = (newText: string) => {
    setText(newText);
  };

  const [updatePostMutation] = useUpdatePostMutation();

  const handleUpdate = async () => {
    let data = {
      text,
      id: params?.id,
    };
    try {
      const res = await updatePostMutation(data).unwrap();
      console.log(res);
      if (res) {
        toast.success("Post created");
        router.push(`/blog/${res?.id}`);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`${error.data.error}`);
    }
  };
  return (
    <main className="min-h-screen sm:p-24 py-16 px-4">
      <h1 className="text-[32px] font-medium">Edit Post</h1>

      <button
        className="self-start mt-6 font-medium"
        onClick={() => router.back()}
      >
        {` < Back`}
      </button>

      <div className="flex gap-[81px] mt-[60px]  w-fit">
        <div className="text-[24px] flex flex-col items-center gap-[21px]">
          <div
            className={`sm:min-w-[147px] sm:min-h-[147px] w-[130px] h-[130px]  flex items-center justify-center`}
          >
            <Image
              src={postDetails?.image || ""}
              width={100}
              height={100}
              alt=" user avatar"
              className="w-[100%] h-[100%]"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start">
        <QuillEditor
          value={text}
          onChange={handleEditorChange}
          modules={quillModules}
          formats={quillFormats}
          className="w-[50%] h-fit mt-10 bg-white rounded-[12px]"
        />
        <button
          onClick={handleUpdate}
          className="bg-[#0c2e61] text-[#fff] mt-4 p-2 rounded-[8px] self-start"
        >
          Edit Post
        </button>
      </div>
    </main>
  );
};

export default Edit;
