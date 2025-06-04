import { useEffect, useRef } from "react";
import { isEmailValid } from "src/utils/form";
import { useAuthContext } from "../../context/AuthContext";

const CreateContact = ({ isModalOpen, setIsModalOpen }) => {
  const { addUser } = useAuthContext();

  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  useEffect(() => {
    resetForm();
  }, [isModalOpen]);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    await submitToDb();

    window.location.reload();
    setIsModalOpen(false);
  };

  const validateForm = () => {
    if (!emailRef.current.value || !isEmailValid(emailRef.current.value)) {
      emailRef.current.classList.add("auth__input--invalid");
      return false;
    }

    if (!firstNameRef.current.value) {
      firstNameRef.current.classList.add("auth__input--invalid");
      return false;
    }

    if (!lastNameRef.current.value) {
      lastNameRef.current.classList.add("auth__input--invalid");
      return false;
    }

    return true;
  };

  const submitToDb = async () => {
    await addUser(
      emailRef.current.value,
      firstNameRef.current.value,
      lastNameRef.current.value
    );
  };

  const resetForm = () => {
    emailRef.current.value = "";
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
  };

  return (
    <div className="auth__container">
      <h2 className="auth__header">Create Contact</h2>
      <div className="auth__form">
        <Input id="email" label="Email" type="email" ref={emailRef} />
        <Input
          id="firstname"
          label="First Name"
          type="text"
          ref={firstNameRef}
        />
        <Input id="lastname" label="Last Name" type="text" ref={lastNameRef} />

        <button type="button" onClick={handleSubmit} className="auth__submit">
          Save
        </button>
      </div>
    </div>
  );
};

const Input = ({ id, label, type, ref }) => {
  const handleChange = (e) => {
    e.target.classList.remove("auth__input--invalid");
  };

  return (
    <div className="auth__group">
      <label htmlFor={id} className="auth__label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        ref={ref}
        onChange={handleChange}
        className="auth__input"
      />
    </div>
  );
};

export default CreateContact;
