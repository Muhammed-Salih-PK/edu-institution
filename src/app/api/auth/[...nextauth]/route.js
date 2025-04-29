import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/clientPromise";
import Admin from "@/models/Admin";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();
        
        const admin = await Admin.findOne({ email: credentials?.email }).select('+password');
        
        if (!admin) {
          throw new Error("No admin found with this email");
        }
        
        if (admin.isLocked) {
          throw new Error("Account is locked. Please contact support.");
        }
        
        const isValid = await bcrypt.compare(credentials?.password || '', admin.password);
        
        if (!isValid) {
          // Increment login attempts
          admin.loginAttempts += 1;
          if (admin.loginAttempts >= 15) {
            admin.isLocked = true;
          }
          await admin.save();
          throw new Error("Invalid password");
        }
        
        // Reset login attempts on successful login
        admin.loginAttempts = 0;
        admin.lastLogin = new Date();
        await admin.save();
        
        return {
          id: admin._id.toString(),
          email: admin.email,
          role: admin.role
        };
      }
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.sub;
      }
      return session;
    }
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };