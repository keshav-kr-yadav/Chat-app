import React from "react";
const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <div style={{ color: "red" }}>
      <p>{children}</p>
    </div>
  );
};

export default ErrorMessage;
