// import NextAuth from 'next-auth'

// declare module 'next-auth' {
//     interface Session {
//         user: { 
//             name: string | null | undefined,
//             roles: string[],
//             picture: string | null | undefined
//             email: string | null | undefined
//             initials: string | null | undefined
//         }
//       }

//     interface Profile {
//         roles: string[]
//     }
// }

// declare module 'next-auth/jwt' {
//     interface JWT {
//         name: string | null | undefined,
//         roles: string[],
//         picture: string | null | undefined
//     }
//   }
import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: { 
            id:string,
            name: string | null | undefined,
            roles: string[],
            picture: string | null | undefined
            email: string | null | undefined
            initials: string | null | undefined
        }
        
      }
      interface User {
        id: string;
        roles: string[];
    }

    interface Profile {
        roles: string[]
    }
}


declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        name: string | null | undefined,
        roles: string[],
        picture: string | null | undefined,
       
    }
  }

