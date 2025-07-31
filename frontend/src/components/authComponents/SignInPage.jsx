import Navbar from "../Navbar";
import TransitionWrapper from "../transitionComponents/TransitionWrapper";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <>
      <Navbar></Navbar>
      <TransitionWrapper>
        <SignInForm></SignInForm>
      </TransitionWrapper>
    </>
  );
}
