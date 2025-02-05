import React from "react";
import PropTypes from "prop-types";

const Input = React.forwardRef(
  (
    {
      type = "text",
      name,
      onChange,
      value,
      label,
      error,
      disabled,
      placeholder,
      min,
      max,
    },
    ref
  ) => {
    return (
      <div className="form-group">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          className={`form-control ${error ? "is-invalid" : ""}`}
          type={type}
          name={name}
          ref={ref}
          disabled={disabled}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
);

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Input;
