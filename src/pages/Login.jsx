import { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.name);
      localStorage.setItem('role', res.data.role);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-bg-100 text-text-100">
      <form onSubmit={handleSubmit} className="bg-bg-200 p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-primary-100">Login to Monexa</h2>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 rounded border border-bg-300 bg-bg-100 text-text-100 focus:outline-none focus:border-primary-100"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 rounded border border-bg-300 bg-bg-100 text-text-100 focus:outline-none focus:border-primary-100"
          required
        />
        <button className="bg-primary-100 hover:bg-primary-200 text-white px-4 py-2 rounded w-full">
          Login
        </button>
        <div className="flex justify-between gap-2">
          <button
            type="button"
            className="text-sm text-primary-200 hover:underline"
            onClick={() => navigate('/register')}
          >
            New here? Register
          </button>
          <button
            type="button"
            className="text-sm text-accent-100 hover:underline"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
