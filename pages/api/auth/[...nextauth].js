import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from "./lib/mongodb";
import GitHubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import db from '../../../utils/db';
import CredentialsProvider from "next-auth/providers/credentials";




db.connect_Db();


export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  providers: [


    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
        
      },




      // async authorize(credentials, req) {
      //   await db.connect_Db(); 
      //   const email = credentials.email;
      //   const password = credentials.password;

      //   const user = await User.findOne({ email });

      //   if (user) {
      //     return SignInUser({ password, user });
      //   } else {
      //     throw new Error('This email does not exist');
      //   }
      // }

      async session({ session, token }) {
        if (token.sub) {
          let user = await User.findById(token.sub);
          session.user._id = user?._id.toString();
          session.user.role = user?.role || "user"; // ✅ Acum setează corect rolul
        }
        return session;
      },
      



    }),


    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET
    }),
    TwitterProvider({
      clientId: process.env.NEXT_PUBLIC_TWITTER_ID,
      clientSecret: process.env.NEXT_PUBLIC_TWITTER_SECRET
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER
    }),
  ],



  callbacks:{
    async session({session,token}){
      let user=await User.findById(token.sub);
      session.user._id=token.sub||user._id.toString();
      session.user.role || "user";
      return session
    },
  },



  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
});






const SignInUser = async ({ password, user }) => {

  
  if (!user.password) {
    throw new Error("Please enter your password");
  }


  

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error('Email or password is incorrect');
  }

  return user; 
};
