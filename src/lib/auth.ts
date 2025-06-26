// ✅ /lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { pool } from "@/lib/db";
import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        const client = await pool.connect();
        try {
          const result = await client.query(
            `SELECT * FROM users WHERE email = $1`,
            [credentials.email]
          );

          const user = result.rows[0];
          if (!user) return null;

          const isValid = await compare(credentials.password, user.password_hash);
          if (!isValid) return null;

          return { id: user.id, email: user.email };
        } finally {
          client.release();
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login?error=CredentialsSignin"
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
