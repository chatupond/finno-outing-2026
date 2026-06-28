import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { isAllowedEmail } from "@/app/lib/config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    error: "/auth/error",
  },
  callbacks: {
    signIn({ user }) {
      const email = user.email ?? ""
      return isAllowedEmail(email)
    },
    session({ session, token }) {
      if (token.picture) {
        session.user.image = token.picture as string
      }
      return session
    },
  },
})
