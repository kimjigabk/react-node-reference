import React from "react";

//props generated from Field (from redux-form)
const SurveyField = ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      {/* input parameter has functions (like onChange, etc) 
      put them in this input tag by using ...<- */}
      <input {...input} style={{ marginBottom: "5px" }} autoComplete="off" />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

export default SurveyField;
