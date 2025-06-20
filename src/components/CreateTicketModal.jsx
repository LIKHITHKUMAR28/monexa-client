// src/components/CreateTicketModal.jsx
import { useState } from 'react';
import axios from '../axios';

const CreateTicketModal = ({ isOpen, onClose, projectId, onCreated }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'To Do',
    assignedTo: ''
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/tickets',
        { ...form, projectId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to create ticket');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-bg-200 p-6 rounded-xl shadow-xl w-full max-w-md space-y-4 text-text-100"
      >
        <h2 className="text-2xl font-bold text-white-100">➕ Create Ticket</h2>

        {error && <p className="text-red-400">{error}</p>}

        {['title', 'description'].map((field) => (
          <input
            key={field}
            type={field === 'description' ? 'textarea' : 'text'}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full p-2 border border-bg-300 rounded bg-bg-100"
            required
          />
        ))}

        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          className="w-full border p-2 rounded bg-bg-100"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border p-2 rounded bg-bg-100"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <input
          type="text"
          placeholder="Assign to (email or username)"
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
          className="w-full p-2 border border-bg-300 rounded bg-bg-100"
          required
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 rounded text-white">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-primary-100 text-white rounded hover:bg-primary-200">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicketModal;
