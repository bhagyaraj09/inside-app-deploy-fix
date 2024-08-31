import { withAuth } from "next-auth/middleware"
import { EmployeeRoutes, EngagementManagerRoutes, ExecutiveRoutes, ProjectManagerRoutes } from "@/src/lib/routes";

export default withAuth(
  function middleware(req) {},
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if(token?.roles.includes('User')){
          if(token?.roles.includes('Admin')){            
            return true;
          }
          if(token?.roles.includes('Executive')){            
            return ExecutiveRoutes.findIndex((route) => { return req.nextUrl.pathname.startsWith(route);}) != -1;
          }          
          if(token?.roles.includes('EngagementManager')){            
            return EngagementManagerRoutes.findIndex((route) => { return req.nextUrl.pathname.startsWith(route);}) != -1;
          }
          if(token?.roles.includes('ProjectManager')){            
            return ProjectManagerRoutes.findIndex((route) => { return req.nextUrl.pathname.startsWith(route);}) != -1;
          }
          return EmployeeRoutes.findIndex((route) => { return req.nextUrl.pathname.startsWith(route);}) != -1;
        }
        else{
          return false;
        }
      },
    },
  }
)

export const config = {matcher: ["/admin/:path*", "/about/:path*", "/encc/:path*",
                                  "/contact",  "/time", "/leave", "/holiday-schedule", "/human-resources", "/leave-policy", "/"]}