import { DefaultUser, DefaultSession, NextAuthOptions, NextAuthProvider } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend the DefaultUser and DefaultSession types to include additional fields
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    accessToken?: string;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

// Define the credentials object for the CredentialsProvider
interface Credentials {
  email?: string;
  password?: string;
}

// Define the Google profile structure
interface GoogleProfile {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

// Define the structure of the NextAuth options with your providers and callbacks
declare module "next-auth" {
  interface NextAuthOptions {
    providers: [
      {
        id: string;
        name: string;
        type: string;
        credentials?: {
          email?: { label: string; type: string };
          password?: { label: string; type: string };
        };
        profile?: (profile: GoogleProfile) => Partial<User>;
        authorize?: (credentials: Credentials) => Promise<User | null>;
      }
    ];
    callbacks?: {
      session?: (params: { session: Session; token: JWT }) => Promise<Session>;
      jwt?: (params: { token: JWT; user: User | undefined }) => Promise<JWT>;
    };
  }
}
