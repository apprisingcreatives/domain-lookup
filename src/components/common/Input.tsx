type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  type?: 'text';
};

const Input = ({
  value,
  onChange,
  onBlur,
  error,
  helperText,
  placeholder,
  type,
}: Props) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
      />
      {error && <p className='text-red-500 text-sm'>{helperText}</p>}
    </>
  );
};

export default Input;
