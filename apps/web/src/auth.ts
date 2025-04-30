import NextAuth, { Session } from "next-auth";
import GitHub from "next-auth/providers/github";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import axios, { endpoints } from "@/utils/axios";

export interface CustomSession extends Session {
  access_token?: string;
  email?: string;
  name?: string;
  image?: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      credentials: {
        identifier: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { identifier, password } = credentials;

        const response = await axios.post(endpoints.auth.signIn, {
          identifier,
          password,
        });

        const { access_token, user } = response.data;

        if (!user) return null;

        return {
          name: user.name,
          email: user.email,
          image: user.image || null,
          access_token,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: CustomSession; token: JWT }) {
      session.access_token = token.accessToken as string;
      session.email = token.email as string;
      session.name = token.name as string;
      session.image = token.image as string;
      return session;
    },
    async jwt({ token, account, profile, user }) {
      if (account && user) {
        if (account?.provider === "github") {
          return {
            accessToken: jwt.sign(
              { id: profile?.id, email: profile?.email },
              process.env.AUTH_SECRET!,
              { expiresIn: "1h" },
            ),
            expires: Date.now() + 60 * 60 * 1000,
            email: profile?.email,
            name: profile?.name,
            image: profile?.avatar_url,
          };
        }

        if (account?.provider === "credentials") {
          return {
            accessToken: (user as { access_token: string }).access_token,
            expires: Date.now() + 60 * 60 * 1000,
            email: (user as { email: string }).email,
            name: (user as { name: string }).name,
            image: (user as { image: string }).image,
          };
        }
      }

      return token;
    },
  },
});
