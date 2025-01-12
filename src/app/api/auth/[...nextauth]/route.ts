import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../../lib/prisma";
import bcrypt from "bcrypt"

const handler = NextAuth({
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
          async authorize(credentials, req) {
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
      
            // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
            // if (user) {
            //   // Any object returned will be saved in `user` property of the JWT
            //   return user
            // } else {
            //   // If you return null then an error will be displayed advising the user to check their details.
            //   return null
      
            //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            // }
          }
        })
    ]
    
})

export { handler as GET, handler as POST }