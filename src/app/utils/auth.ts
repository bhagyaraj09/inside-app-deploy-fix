// import { NextAuthOptions } from "next-auth"
// import AzureADProvider from 'next-auth/providers/azure-ad'

// export const authOptions = {
//   providers: [
//     AzureADProvider({
//       clientId: process.env.AZURE_AD_CLIENT_ID as string,
//       clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
//       tenantId: process.env.AZURE_AD_TENANT_ID,
//     })
//   ],    
//   callbacks: {
//     jwt({ token, account, profile }) {
//       //account object has the id token, refresh token and access token
//       if(account) if(profile) token.roles = profile.roles
//         return token
//     },
//     session({ session, token}) {
//       session.user.roles = token.roles;
//       session.user.picture = token.picture;
//       session.user.name = token.name;
//       session.user.initials = token.name?.split(' ').map(a => a[0]).join('');
//       session.user.email = token.email;
//       return session;
//     }
//   },
//   pages: {
//     signIn: '/auth/signin'
//   }
// } satisfies NextAuthOptions


import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
 
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Your authentication logic here
        // For example, you can check against a database here.
        if (
          credentials?.email === "test@example.com" &&
          credentials?.password === "password"
        ) {
          return {
            id: "1",
            name: "Test User",
            email: "test@example.com",
            roles: ["User", "Admin"] // Example roles
          };
        } 
        if (credentials?.email=="executive@example.com" &&
          credentials?.password === "password"){
            return {
              id: "2",
              name: "Test Executive",
              email: "executive@example.com",
              roles: ["User", "Executive"] // Example roles
            };

          } 
          if (credentials?.email=="engagementmanager@example.com" &&
            credentials?.password === "password"){
              return {
                id: "3",
                name: "Test Engagement Manager",
                email: "engagementmanager@example.com",
                roles: ["User", "EngagementManager"] // Example roles
              };
  
            }
            if (credentials?.email=="projectmanager@example.com" &&
              credentials?.password === "password"){
                return {
                  id: "4",
                  name: "Test Project Manager",
                  email: "projectmanager@example.com",
                  roles: ["User", "ProjectManager"] // Example roles
                };
    
              }
              if (credentials?.email=="employee@example.com" &&
                credentials?.password === "password"){
                  return {
                    id: "5",
                    name: "Test Employee",
                    email: "projectmanager@example.com",
                    roles: ["User", "Employee"] // Example roles
                  };
      
                }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.roles = user.roles || []; // Ensure roles are set
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id?token.id:"id",
          name: token.name,
          email: token.email,
          roles: token.roles || [], // Ensure roles are set
          picture: token.picture,
          initials: token.name?.split(' ').map(a => a[0]).join(''),
        };
      }
      
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
};
