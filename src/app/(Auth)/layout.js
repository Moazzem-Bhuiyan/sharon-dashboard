import Image from "next/image";
import React from "react";
import backgroundImage from "@/assets/images/authsidebar.png";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black">
      <div className="flex min-h-screen w-full max-w-[1500px]">
        {/* Left Sidebar Image */}
        <div className="hidden w-full items-center justify-center bg-black p-10 lg:flex">
          <Image
            src={backgroundImage}
            alt="Auth Side Image"
            className="h-auto w-full object-contain"
            priority
          />
        </div>

        {/* Right Side Content */}
        <div className="flex w-full items-center justify-center px-6 md:px-12 lg:w-full">
          <div className="w-full max-w-[620px]">{children}</div>
        </div>
      </div>
    </div>
  );
}
