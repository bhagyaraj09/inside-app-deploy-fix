import PoweredBy from "@/components/nav/powered-by"
import SignInWithAzure from "@/components/auth/signin-with-azure"
import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"
import { redirect } from "next/navigation"
import SignInForm from "@/src/components/auth/signin-in-form"

export default async function signInPage() {

  const session = await getServerSession(authOptions)
  if(session)
    return redirect("/")

  return ( 
    <div className="flex flex-col items-center justify-center px-4 py-0 mx-auto">
      <h1 className="text-3xl mb-5 font-medium leading-tight tracking-tight text-gray-900">Employee Portal</h1>
      <div className="w-full bg-white rounded-lg border border-purple-400 md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="flex flex-col p-6 space-y-4 items-center justify-center md:space-y-6 sm:p-8">
            <h1 className="text-xl font-medium leading-tight tracking-tight text-gray-900 ">
                Sign in to your account
            </h1>
            {/* <SignInWithAzure />  */}
            <SignInForm/>
        </div>
      </div>
      <div className="powered-by ">
        <PoweredBy color={"black"} />
      </div>
    </div>
  )
}