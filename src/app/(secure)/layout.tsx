import type { Metadata } from 'next'
import BreadCrumb from '@/components/ui/bread-crumb'
import NextAuthProvider from '@/components/nav/next-auth-provider';
import SideNav from '@/components/nav/side-nav'
import "../globals.css"
import Logout from '@/components/nav/logout';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Symphonize Employee Portal',
  description: 'Symphonize employee portal'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/9bf550f8ab.js" crossOrigin="anonymous" async></script>
      </head>
      <body>
        <NextAuthProvider>
          <div className="content md:flex md:max-h-screen">
            <SideNav />
            <main className="w-full sm:flex-1 md:min-h-screen bg-[#fff]">
              <div className="flex justify-between pr-5 p-1 bg-[#f0f0f0]">
                <BreadCrumb
                  homeElement={'Home'}
                  separator={<i className='fa fa-chevron-right' />}
                  activeClasses='text-blue-600'
                  containerClasses='p-2 flex text-gray-700 text-xs items-center bg-[#f0f0f0] mx-2' 
                  listClasses='hover:underline mx-2'
                  capitalizeLinks
                />
                <Logout />
              </div>
              {children}
            </main>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}