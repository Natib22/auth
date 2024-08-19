
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { use } from "react";



export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        console.log("from options" , profile)
        return {
          ...profile,
          id: profile.sub,
          provider: "google",
        };
      },
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // credentials to backend for verification
        const res = await fetch("https://akil-backend.onrender.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        // If no user or error, return null
        if (!res.ok || !user) {
          return null;
        }
        
      
        
        return user.data; 
      },
    }),
    
  ],

  callbacks : {
    async session({ session, token }: { session: any, token: any }) {
  
      if (session.user.image) 
        session.user.image = token.picture;
      if (token.accessToken) {
        session.user.accessToken = token.accessToken; // Google
      } 
      session.user.id = token.id;
      return session;
    },
    async jwt({ token , user }: { token: any , user: any }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
      }
        return token;
      },
  }
 
};




