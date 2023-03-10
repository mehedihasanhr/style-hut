const InputGroup = ({ children, className }) => {
  return <div className={`flex flex-col gap-2 ${className}`}>{children}</div>;
};

export default InputGroup;
