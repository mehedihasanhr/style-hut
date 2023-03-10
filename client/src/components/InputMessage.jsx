const InputMessage = ({ text, className = '', type = 'error' }) => {
  const classes = {
    error: 'border-red-400 text-red-500',
    success: 'border-green-400 text-green-500',
  };

  const classList = `text-xs font-medium ${classes[type]} ${className}`;

  return <p className={classList}>{text}</p>;
};

export default InputMessage;
