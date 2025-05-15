import React from 'react';

type Props = {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
};

const Button = ({ onClick, disabled, loading, children }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className='w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-medium cursor-pointer disabled:pointer-events-none'
    >
      {children}
    </button>
  );
};

export default Button;
