import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AHCSEMN Sign In",
  description: "This is AHCSEMN Signin Page  ",
};

export default function SignIn() {
  return <SignInForm />;
}
