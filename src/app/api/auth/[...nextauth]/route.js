import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectToDatabase, getDb } from "@/lib/db";
import clientPromise from "@/lib/mongodbClient";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const { db } = await connectToDatabase();
          const adminCollection = db.collection("admins");

          const admin = await adminCollection.findOne({
            email: credentials.email,
          });
          if (!admin) {
            throw new Error("Invalid credentials");
          }

          const mongooseAdmin = await Admin.findOne({
            email: credentials.email,
          }).select("+password");
          if (!mongooseAdmin) throw new Error("Invalid credentials");

          if (mongooseAdmin.isLocked)
            throw new Error("Account locked - contact support");

          const isValid = await bcrypt.compare(
            credentials.password,
            mongooseAdmin.password
          );
          if (!isValid) {
            await adminCollection.updateOne(
              { _id: new ObjectId(admin._id) },
              { $inc: { loginAttempts: 1 } }
            );
            const updatedAdmin = await adminCollection.findOne({
              email: credentials.email,
            });

            if (updatedAdmin.loginAttempts >= 15) {
              await adminCollection.updateOne(
                { _id: new ObjectId(admin._id) },
                { $set: { isLocked: true } }
              );
            }
            throw new Error("Invalid credentials");
          }

          await adminCollection.updateOne(
            { _id: new ObjectId(admin._id) },
            { $set: { loginAttempts: 0, lastLogin: new Date() } }
          );

          return {
            id: admin._id.toString(),
            email: admin.email,
            role: admin.role,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw error;
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
