import moment from "moment";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const Card = ({
  id,
  img,
  text,
  date,
  owner,
}: {
  id: string;
  img: string;
  text: string;
  date: string;
  owner: {
    picture: string;
    firstName: string;
    title: string;
    lastName: string;
  };
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/blog/${id}`)}
      className="rounded-[16px] cursor-pointer bg-white border border-[#292d3233] hover:border-none ease-out w-[318px] p-5"
    >
      <div className="w-full h-[150px]">
        <Image
          src={img}
          width={100}
          height={100}
          quality={100}
          alt=""
          className="w-full h-full rounded-[16px]"
        />
      </div>

      <h3 className="mt-4">{text}</h3>

      <div className="flex gap-3 mt-4">
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
            {moment(date).format("lll")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
