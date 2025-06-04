import FormInput from "../inputs/FormInput";

const CreateContact = ({ setIsModalOpen }) => {
  return (
    <div className="auth__container">
      <h2 className="auth__header">Create Contact</h2>
      <div className="auth__form">
        <FormInput id="email" label="Email" type="email" />
        <FormInput id="firstname" label="First Name" type="text" />
        <FormInput id="lastname" label="Last Name" type="text" />
        <FormInput id="position" label="Job Title" type="text" />
      </div>
    </div>
  );
};

export default CreateContact;
