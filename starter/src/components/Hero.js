import React from "react";
import image1 from "../assests/image1.png";

export default function () {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
          Your Research, Organized, Streamlined, and Accessible.
        </h1>
        <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
          Efficiency is key when it comes to research. Our platform offers a
          seamless experience for storing, organizing, and accessing your
          research papers. Spend less time searching for documents and more time
          focusing on what matters most—your research.
        </p>
      </div>
      <div className="hidden lg:flex lg:items-center lg:justify-center">
        <img
          src={image1}
          width="616"
          height="617"
          className="object-cover"
          alt="Hero Illustration"
          loading="eager"
          placeholder="blur"
        />
      </div>
    </div>
  );
}
