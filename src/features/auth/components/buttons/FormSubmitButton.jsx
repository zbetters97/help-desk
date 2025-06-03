const FormSubmitButton = ({ label }) => {
  return (
    <button type="submit" className="auth__submit">
      {label}
    </button>
  );
};

export default FormSubmitButton;
