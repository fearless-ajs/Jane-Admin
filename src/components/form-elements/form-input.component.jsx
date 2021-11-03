import React from 'react';

const FormInput= ({ handleChange, sideIcon, ...otherInputProps  }) => (
      <input onChange={handleChange}  className="form-control" { ...otherInputProps } />
);

export default FormInput;