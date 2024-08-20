"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";
import unknown from "../assets/unknown.png";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  return (
    <div className="flex justify-between items-center w-full px-8 py-1 mt-3">
      <p>Nb Jobs</p>

      <div className="flex items-center justify-between w-72 mr-6">
        <button
          onClick={() => router.push("bookmark")}
          className="btn  border-bluepurple"
        >
          {" "}
          Bookmarks
        </button>

        {sessionData ? (
          <a
            className="btn border border-bluepurple rounded-2xl "
            href="/api/auth/signout"
          >
            Logout
          </a>
        ) : (
          <a href="/api/auth/signin">Login</a>
        )}

        <Image
          className="w-14 h-auto border border-bluepurple rounded-full bg-white p-0"
          src={sessionData?.user?.image || unknown}
          alt=""
        />
      </div>
    </div>
  );
};

export default Nav;
