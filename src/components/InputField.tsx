import React from 'react';

interface InputFieldProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
}

function InputField({ input, handleInputChange, isDisabled }: InputFieldProps) {
  return (
    <input
      type="text"
      value={input}
      onChange={handleInputChange}
      className="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      disabled={isDisabled}
    />
  );
}

export default InputField;