"use client";
import { signIn } from "next-auth/react";

export default function SignInWithAzure() {
  return (
    <button
      type="button"
      onClick={() =>
        signIn("azure-ad", {
          callbackUrl: `${window.location.origin}`,
        })
      }
      className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-700 px-6 py-3 text-sm leading-5 rounded-lg font-normal text-white"
    >
      Login with your Symphonize Account
    </button>
  );
}