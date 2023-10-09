import Image from "next/image";
import React from "react";

const Card = ({
  img,
  text,
  id,
  date,
}: {
  img: string;
  text: string;
  id: string;
  date: string;
}) => {
  return (
    <div
      className="rounded-[16px] cursor-pointer bg-white border border-[#292d3233] hover:border-none ease-out w-[318px] h-[347px] p-5"
      key={id}
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
    </div>
  );
};

export default Card;
