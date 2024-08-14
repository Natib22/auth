import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import "./globals.css";
const Homepage = async () => {
  const session = await getServerSession();
  console.log(session, "here");
  console.log("first mount");
  if (!session) {
    redirect("/auth/login");
  }
  return (
    <div>
      <p className="text-4xl">Homepage dashboard</p>
    </div>
  );
};

export default Homepage;
