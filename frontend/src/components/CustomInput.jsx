import React from "react";

const CustomInput = (props) => {
  const { type, name, placeholder, classname, value, onChange, onBlur } = props;
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className={`form-control custom-input ${classname}`}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default CustomInput;