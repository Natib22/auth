import { useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";
import unknown from "../assets/unknown.png";

const Nav = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="flex justify-between items-center w-full px-8 py-1 mt-3">
      <p>Nb Jobs</p>

      <div className="flex items-center justify-between w-36 mr-6">
        {
          <Image
            className="w-14 h-auto border border-bluepurple rounded-full bg-white p-0"
            src={sessionData?.user?.image || unknown}
            alt=""
          />
        }
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
      </div>
    </div>
  );
};

export default Nav;
