import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AHCSEMN SignUp ",
  description: "This is AHCSEMN SignUp Page ",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
