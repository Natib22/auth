"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page if not authenticated
    if (status === "loading") return; // Do nothing while loading
    if (!sessionData) {
      router.push("/auth/login");
    }
  }, [sessionData, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // Optionally show a loading indicator
  }

  return (
    <div>
      <p className="text-4xl">Hello {sessionData?.user?.name}</p>
      <button onClick={() => signOut({ callbackUrl: "/auth/signup" })}>
        Logout
      </button>
    </div>
  );
};

export default Home;

// const Nav = () => {
//   const { data: sessionData } = useSession();

//   return (
//     <header className="bg-gray-600 text-gray-100">
//       <nav className="flex justify-between items-center w-full px-10 py-4">
//         <div>My Site</div>
//         <p>{sessionData?.user?.name}</p>
//         <div className="flex gap-10">
//           <Link href="/">Home</Link>
//           <Link href="/CreateUser">Create User</Link>
//           <Link href="/ClientMember">Client Member</Link>
//           <Link href="/Member">Member</Link>
//           <Link href="/Public">Public</Link>
//           {sessionData ? (
//             <button
//               onClick={() => signOut({ callbackUrl: "/" })}
//               className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
//             >
//               Logout
//             </button>
//           ) : (
//             <Link href="/api/auth/signin">Login</Link>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Nav;
