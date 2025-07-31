import Navbar from "../Navbar";
import TransitionWrapper from "../transitionComponents/TransitionWrapper";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <>
      <TransitionWrapper>
        <SignUpForm></SignUpForm>
      </TransitionWrapper>
    </>
  );
}
