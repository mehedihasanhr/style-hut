const Label = ({ text, htmlFor = '', className = 'text-sm' }) => {
  return (
    <label htmlFor={htmlFor} className={`text-gray-500 ${className}`}>
      {text}
    </label>
  );
};

export default Label;
