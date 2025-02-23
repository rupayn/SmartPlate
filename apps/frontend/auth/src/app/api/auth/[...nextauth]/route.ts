import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@repo/db/config";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email  || !credentials?.password )
        throw new Error("Missing credentials");
        const en = parseInt(credentials.email);
        let user;
        if (en)
          user = await prisma.user.findUnique({
            where: {
              enrollment: en ,
            },
          });
        else{
          user =await prisma.user.findUnique({
            where:{
              email:credentials.email
            }
          })
        }

        
        // ✅ Fix: Convert `id` to string to match NextAuth's expected `User` type
        if(user)
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          isAdmin: user.isAdmin,
        };
        else return null
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    newUser: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
