"use client";

import { useGetPostQuery } from "@/apis/BlogQuery";
import Card from "@/components/Card";
import Image from "next/image";

export default function Home() {
  const { data: posts, isFetching, isLoading, error } = useGetPostQuery(null);
  console.log(posts);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h3 className="text-[32px]">FROM OUR BLOG</h3>
      <h1 className="text-[16px] mt-3">Recent articles</h1>

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
              }: {
                image: string;
                text: string;
                id: string;
                publishDate: string;
              }) => (
                <Card id={id} img={image} text={text} date={publishDate} />
              )
            )}
          </section>
        ) : null}
      </section>
    </main>
  );
}
