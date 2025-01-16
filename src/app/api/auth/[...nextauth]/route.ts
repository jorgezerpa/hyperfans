import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../../lib/prisma";
import bcrypt from "bcrypt"

export const authOptions:AuthOptions = {
  pages: {
    signIn: "/login",
    newUser: "/signup"
  },
  providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Email", type: "text", placeholder: "jsmith@gmail.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          if (!credentials) return null;
          // get user from DB using its email
          const user = await prisma.user.findUnique({
            where: {
                email: credentials.username
            }
          });

          if (!user) return null;
          if(!user.password) return null;

          // comparing provided password with stored in DB
          const match = await bcrypt.compare(credentials.password, user.password);
          if (!match) return null;

          return { 
            id: user.id.toString(), 
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }
      })
  ],
  callbacks: {
    async jwt(params) {
      if(params.user) {
        params.token.role = params.user.role
      }
      return params.token
    },
    session({session,token}) {
      session.user.role = token.role
      return session
    }
  }
  
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }