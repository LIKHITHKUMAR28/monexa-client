import { useState } from 'react';
import axios from '../axios';

const ForgotPassword = () => {
  const [form, setForm] = useState({ email: '', newPassword: '', confirmPassword: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/auth/forgot-password', form);
    setMsg(res.data.msg);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-bg-100 text-text-100">
      <form onSubmit={handleSubmit} className="bg-bg-200 p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-primary-100">Reset Password</h2>
        <input
          type="email"
          placeholder="Registered Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 rounded border border-bg-300 bg-bg-100 text-text-100"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          className="w-full p-2 rounded border border-bg-300 bg-bg-100 text-text-100"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          className="w-full p-2 rounded border border-bg-300 bg-bg-100 text-text-100"
          required
        />
        <button className="bg-primary-100 hover:bg-primary-200 text-white px-4 py-2 rounded w-full">
          Reset Password
        </button>
        {msg && <p className="text-green-400 text-sm text-center mt-2">{msg}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
