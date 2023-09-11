/*import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider.default({
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize(credentials: any) {
        const user = {
          id: "1",
          name: "J Smith",
          username: "jsmith",
          password: "hunter2",
          image: "https://avatars.githubusercontent.com/u/25911230?v=4",
        };

        if (
          credentials?.username === user.username &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          console.error(
            "Warning: Malicious login attempt registered, bad credentials provided"
          );
          return null;
        }
      },
    }),
  ],
});
*/