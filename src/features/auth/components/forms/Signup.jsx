import { useRef, useState } from "react";
import { isEmailValid } from "src/utils/form";
import { useAuthContext } from "src/features/auth/context/AuthContext";
import Alert from "../alerts/Alert";
import FormInput from "../inputs/FormInput";
import FormSubmitButton from "../buttons/FormSubmitButton";
import FormSwitchButton from "../buttons/FormSwitchButton";

const Signup = ({ setIsSignup }) => {
  const { signup } = useAuthContext();

  const [error, setError] = useState("");
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!validateData()) {
      return;
    }

    if (await signup(firstname, lastname, email, password, setError)) {
      setIsSignup(false);
    }
  };

  const validateData = () => {
    const firstname = formRef.current.elements.firstname;
    const lastname = formRef.current.elements.lastname;
    const email = formRef.current.elements.email;
    const password = formRef.current.elements.password;
    const repassword = formRef.current.elements.repassword;

    if (firstname.value === "" || lastname.value === "") {
      setError("Please enter your name.");
      displayname.classList.add("auth__input--invalid");
      return false;
    }

    if (email.value === "") {
      setError("Please enter an email.");
      email.classList.add("auth__input--invalid");
      return false;
    }

    if (!isEmailValid(email.value)) {
      setError("Please enter a valid email.");
      email.classList.add("auth__input--invalid");
      return false;
    }

    if (password.value === "") {
      setError("Please enter a password.");
      password.classList.add("auth__input--invalid");
      return false;
    }

    if (repassword.value === "") {
      setError("Please re-enter the password.");
      repassword.classList.add("auth__input--invalid");
      return false;
    }

    if (password.value !== repassword.value) {
      setError("Passwords do not match.");
      password.classList.add("auth__input--invalid");
      repassword.classList.add("auth__input--invalid");
      return false;
    }

    return true;
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="auth__form auth__form--signup"
    >
      <FormInput id="firstname" label="First Name" type="text" />
      <FormInput id="lastname" label="Last Name" type="text" />
      <FormInput id="email" label="Email" type="email" />

      <FormInput id="password" label="Password" type="password" />
      <FormInput id="repassword" label="Re-enter Password" type="password" />

      <Alert message={error} />
      <FormSubmitButton label="Sign up" />

      <FormSwitchButton
        header="Already have an account with us?"
        label="Log in"
        direction="after"
        setIsSignup={setIsSignup}
      />
    </form>
  );
};

export default Signup;
