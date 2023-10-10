"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import { useCreatePostMutation } from "@/apis/BlogQuery";
import { toast } from "react-toastify";
import Image from "next/image";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const CreatePost = () => {
  const [text, setText] = useState<string>("");
  const [imageUrl, setImageUrl] = useState({ img: "", alt: "" });

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

  const fetchData = async (url: string) => {
    const response = await fetch(url);
    const data: any = await response.json();
    setImageUrl({ img: data?.photo.url, alt: data?.photo.title });
  };

  const URL = `https://api.slingacademy.com/v1/sample-data/photos/${Math.floor(
    Math.random() * 100 + 1
  )}`;

  useEffect(() => {
    fetchData(URL);
  }, []);

  const [createPostMutation] = useCreatePostMutation();

  const post = async () => {
    let payload = {
      owner: "60d0fe4f5311236168a109cd",
      text,
      image: imageUrl?.img,
    };
    try {
      const res = await createPostMutation(payload).unwrap();

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
      <h1 className="text-[32px] font-medium">Create Post</h1>

      <button
        className="self-start mt-6 font-medium"
        onClick={() => router.back()}
      >
        {` < Back`}
      </button>

      <div className="flex gap-[81px] mt-[60px]  w-fit">
        <div className="text-[24px] flex flex-col items-center gap-[21px]">
          <div
            className={`sm:min-w-[147px] sm:min-h-[147px] w-[130px] h-[130px]  flex items-center justify-center `}
          >
            <Image
              src={imageUrl?.img}
              width={100}
              height={100}
              alt={imageUrl?.alt}
              className="w-[100%] h-[100%] rounded-[8px]"
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
          onClick={post}
          className="bg-[#0c2e61] text-[#fff] mt-4 p-2 rounded-[8px] self-start"
        >
          Create Post
        </button>
      </div>
    </main>
  );
};

export default CreatePost;
