import React from 'react';

const RemoveButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => {
  return (
    <button
      className="text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600 transition-colors cursor-pointer"
      {...props}
    >
      ✕
    </button>
  );
};

export default RemoveButton;
