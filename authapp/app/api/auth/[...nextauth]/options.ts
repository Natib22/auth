import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";



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
  ],

  callbacks : {
    async session({ session }: { session: any }) {
     
      return session;
    },
    async jwt({ token }: { token: any }) {
        
        return token;
      },
  }
  // Add additional options here
};



