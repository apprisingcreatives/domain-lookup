type Option = { label: string; value: string };

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
};

const SelectInput = ({ value, onChange, options }: Props) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
    >
      {options &&
        Array.isArray(options) &&
        options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
};

export default SelectInput;
