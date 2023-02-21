import React from "react";

const InputField = ({ type, label, name, value, selected, ChangeHandler }) => {
  return (
    <>
      <div className="ipwrapper">
        <label>{!label ? name : label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => ChangeHandler(e)}
          checked={selected}
        />
      </div>
    </>
  );
};

export default InputField;
