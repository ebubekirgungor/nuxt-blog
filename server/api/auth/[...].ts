import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import users from "../../models/user";

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider.default({
      async authorize(credentials: any) {
        const userData = await users.findOne({
          email: credentials?.email,
        });

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
