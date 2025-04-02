import React from 'react';

const AddButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer"
      {...props}
    >
      Add Company
    </button>
  );
};

export default AddButton;
