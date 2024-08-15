import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";


export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          ...profile,
          id: profile.sub,
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
        // Send credentials to your backend for verification
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

        // If successful, return user object
        return user.data; // Assuming `data` contains the user info
      },
    }),
    
  ],

  callbacks : {
    async session({ session, token }: { session: any, token: any }) {
      // Handle the session based on the token properties
      if (token.accessToken) {
        session.accessToken = token.accessToken; // Google
      } else if (token.customToken) {
        session.customToken = token.customToken; // Custom
      }
      session.user.id = token.id;
      return session;
    },
    async jwt({ token }: { token: any }) {
        
        return token;
      },
  }
  // Add additional options here
};




