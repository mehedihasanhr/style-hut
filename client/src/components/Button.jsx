const Button = ({
  children,
  type = 'button',
  onClick,
  className,
  variant = 'primary',
  ...props
}) => {
  const variants = {
    primary: `bg-blue-500 text-white hover:bg-blue-600 ring-blue-500`,
    secondary: `bg-gray-200 text-gray-700 hover:bg-gray-300 ring-gray-200`,
    danger: `bg-red-500 text-white hover:bg-red-600 ring-red-500`,
    success: `bg-green-500 text-white hover:bg-green-600 ring-green-500`,
  };

  const classes = `px-4 py-2 rounded-md flex items-center justify-center gap-2 focus:ring-2 ring-offset-2 ${variants[variant]} ${className}`;

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
