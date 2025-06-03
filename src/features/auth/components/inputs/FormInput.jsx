const FormInput = ({ id, label, type }) => {
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
        onChange={handleChange}
        className="auth__input"
      />
    </div>
  );
};

export default FormInput;
