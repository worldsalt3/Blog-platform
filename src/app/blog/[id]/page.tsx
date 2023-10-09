"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetPostCommentsQuery,
  useGetPostDetailsQuery,
} from "@/apis/BlogQuery";
import Image from "next/image";
import moment from "moment";
import CommentSection from "@/components/CommentSection";

const BlogDetails = () => {
  const params = useParams();
  const router = useRouter();
  console.log(params);

  const {
    data: postDetails,
    error: detailsError,
    isLoading: isDetailsLoading,
    isFetching: isDetailsFetching,
  } = useGetPostDetailsQuery(params);
  const {
    data: postComments,
    error: commentError,
    isLoading: isCommentLoading,
    isFetching: isCommentFetching,
  } = useGetPostCommentsQuery(params);

  console.log(postComments);
  return (
    <main className="flex min-h-screen flex-col items-center sm:p-24 py-16 px-4">
      <h1 className="text-[32px] font-medium ">Blog Details</h1>
      <button
        className="self-start mt-6 font-medium"
        onClick={() => router.back()}
      >
        {` < Back`}
      </button>
      <section className="flex w-full sm:flex-row flex-col flex-wrap mt-16 gap-8">
        <>
          {detailsError ? (
            <p>Oops!, there is an error</p>
          ) : isDetailsFetching || isDetailsLoading ? (
            <p>Loading...</p>
          ) : postDetails ? (
            <article className="flex-[50%]">
              <div className=" w-full h-[400px] rounded-[16px] ">
                <Image
                  src={postDetails?.image}
                  width={100}
                  height={100}
                  quality={100}
                  alt=""
                  className="w-full h-full rounded-[16px] "
                />
              </div>
              <p className="mt-4">{postDetails?.text}</p>
              <a
                target="_blank"
                href={postDetails?.link}
                className="mt-4 block"
              >
                {postDetails?.link || ""}
              </a>

              <div className="flex gap-3 mt-4">
                <Image
                  src={postDetails?.owner?.picture}
                  width={50}
                  height={50}
                  alt={postDetails?.owner.firstName}
                  className="rounded-[50%] "
                />
                <div className="capitalize">
                  <p>{`${postDetails?.owner.title}. ${postDetails?.owner.firstName} ${postDetails?.owner.lastName}`}</p>
                  <span className="text-[12px] text-gray-500">
                    {moment(postDetails?.publishDate).format("lll")}
                  </span>
                </div>
              </div>
            </article>
          ) : null}
        </>
        <>
          {commentError ? (
            <p>Oops!, there is an error</p>
          ) : isCommentFetching || isCommentLoading ? (
            <p>Loading...</p>
          ) : postComments?.data.length > 0 ? (
            <aside className="flex-[50%] ">
              <h3 className="capitalize text-[24px] font-medium ">comments</h3>

              <div className="flex flex-col flex-wrap mt-6 gap-4 max-h-[500px] ">
                {postComments?.data.map(
                  ({
                    id,
                    owner,
                    message,
                    publishDate,
                  }: {
                    message: string;
                    id: string;
                    publishDate: string;
                    owner: {
                      picture: string;
                      firstName: string;
                      title: string;
                      lastName: string;
                    };
                  }) => (
                    <div
                      key={id}
                      className="p-2 border border-[#292d3233] rounded-[6px]"
                    >
                      <div className="flex gap-3">
                        <Image
                          src={owner?.picture}
                          width={50}
                          height={50}
                          alt={owner.firstName}
                          className="rounded-[50%] "
                        />
                        <div className="capitalize">
                          <p>{`${owner.title}. ${owner.firstName} ${owner.lastName}`}</p>
                          <span className="text-[12px] text-gray-500">
                            {moment(publishDate).format("lll")}
                          </span>
                        </div>
                      </div>
                      <p className="p-2 mt-2">{message}</p>
                    </div>
                  )
                )}
              </div>
            </aside>
          ) : (
            <p className="flex-1">No Comment</p>
          )}
        </>
      </section>
      <CommentSection params={params} />
    </main>
  );
};

export default BlogDetails;
