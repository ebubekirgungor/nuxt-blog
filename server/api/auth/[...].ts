import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import users from "../../models/user";
export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user ? user.id || "" : "";
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      (session as any).user.id = token.id;
      return Promise.resolve(session);
    },
  },
  providers: [
    //@ts-ignore
    CredentialsProvider.default({
      async authorize(credentials: any) {
        const userData =
          (await users.findOne({
            email: credentials?.email,
          })) ||
          (await users.findOne({
            username: credentials?.username,
          }));

        if (!userData) {
          console.log("User not found");
          return false;
        }

        const isPasswordValid = await userData.comparePassword(
          credentials?.password
        );

        if (isPasswordValid) {
          console.log("ok");
          return userData;
        } else {
          console.log(
            "Warning: Malicious login attempt registered, bad credentials provided"
          );
          return null;
        }
      },
    }),
  ],
});
