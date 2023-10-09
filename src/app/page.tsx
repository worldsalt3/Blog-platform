"use client";

import { useGetPostQuery } from "@/apis/BlogQuery";
import Card from "@/components/Card";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState<number>(0);
  const {
    data: posts,
    isFetching,
    isLoading,
    error,
  } = useGetPostQuery({ page });

  return (
    <main className="flex min-h-screen flex-col items-center sm:p-24 p-12">
      <h3 className="text-[32px] font-medium">FROM OUR BLOG</h3>
      <h1 className="text-[20px] mt-3">Recent articles</h1>
      <section className="flex justify-around flex-wrap gap-3 mt-4 w-full">
        <form className="flex items-center gap-4">
          <input
            type="search"
            name=""
            id=""
            className="border border-[#292d3233] rounded-[6px] px-4 py-1"
          />
          <button className="border border-[#2F282B] rounded-[4px] hover:bg-[#0c2e61] hover:text-[#fff] px-4 py-1">
            search
          </button>
        </form>

        <Link
          href={"#"}
          className="border border-[#2F282B] rounded-[4px] bg-[#0c2e61] text-[#fff] px-4 py-1"
        >
          Create Post
        </Link>
      </section>
      <section className="mt-12">
        {error ? (
          <p>Oh no!, There was an error</p>
        ) : isLoading || isFetching ? (
          <p>Loading...</p>
        ) : posts ? (
          <section className="flex flex-wrap gap-3 gap-y-6">
            {posts?.data?.map(
              ({
                id,
                image,
                publishDate,
                text,
                owner,
              }: {
                image: string;
                text: string;
                id: string;
                publishDate: string;
                owner: {
                  picture: string;
                  firstName: string;
                  title: string;
                  lastName: string;
                };
              }) => (
                <Card
                  img={image}
                  text={text}
                  date={publishDate}
                  owner={owner}
                  key={id}
                  id={id}
                />
              )
            )}
          </section>
        ) : null}
      </section>

      {posts && !isLoading && !isFetching ? (
        <div className="flex gap-8 mt-8">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 0}
            className={`border border-[#2F282B] rounded-[4px] hover:bg-[#0c2e61] hover:text-[#fff] px-4 py-1 ${
              page === 0 && "cursor-not-allowed"
            }`}
          >
            PREV
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === posts?.total}
            className={`border border-[#2F282B] rounded-[4px] hover:bg-[#0c2e61] hover:text-[#fff] px-4 py-1 ${
              page === posts?.total && "cursor-not-allowed"
            }`}
          >
            NEXT
          </button>
        </div>
      ) : null}
    </main>
  );
}
