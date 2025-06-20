import { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'developer',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-bg-100 text-text-100">
      <form onSubmit={handleSubmit} className="bg-bg-200 p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-primary-100">Register for Monexa</h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 rounded border border-bg-300 bg-bg-100 text-text-100 focus:outline-none focus:border-primary-100"
          required
        />
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
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full p-2 rounded border border-bg-300 bg-bg-100 text-text-100 focus:outline-none"
          required
        >
          <option value="developer">Developer</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>
        <button className="bg-primary-100 hover:bg-primary-200 text-white px-4 py-2 rounded w-full">
          Register
        </button>
        <button
          type="button"
          className="text-sm text-primary-200 hover:underline"
          onClick={() => navigate('/login')}
        >
          Already registered? Login
        </button>
      </form>
    </div>
  );
};

export default Register;
