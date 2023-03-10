const Input = ({
  type = 'text',
  placeholder = '',
  className = 'py-2 px-2',
  onChange = (e) => {},
  name = '',
  value = '',
  id = '',
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 rounded-md border-0 border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-100 ${className}`}
    />
  );
};

export default Input;
