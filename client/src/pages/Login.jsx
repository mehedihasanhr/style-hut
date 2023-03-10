import { Link } from 'react-router-dom';
import Checkbox from '../components/Checkbox';
import Input from '../components/Input';
import InputGroup from '../components/InputGroup';
import InputMessage from '../components/InputMessage';
import Label from '../components/Label';
import Button from '../components/Button';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    const data = {
      email,
      password,
      rememberMe,
    };
    console.log(data);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="px-8 py-10 w-full max-w-[400px] bg-white shadow-lg shadow-slate-200 rounded-lg flex flex-col items-center relative">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-500 mb-5 ring-2">
          <h3 className="font-bold text-white">SH</h3>
        </div>

        <div className="text-center mb-5">
          <h4 className="mb-2 text-xl">Welcome</h4>
          <p className="text-xs text-gray-400">
            -- Please enter your credentials to login --
          </p>
        </div>

        {/* login form */}

        <form className="w-full flex flex-col gap-5">
          <InputGroup>
            <Label htmlFor="email" text="Email" />
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError ? <InputMessage text={emailError} /> : null}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password" text="Password" />
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              labelClassName="text-sm"
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <Link to="/forgot-password" className="text-sm text-blue-500">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" onClick={handleSubmit}>
            Login
          </Button>
        </form>
        <div className="py-4 text-sm absolute top-full left-1/2 transform -translate-x-1/2">
          <span>Email: dev@example.com, pass: password </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
