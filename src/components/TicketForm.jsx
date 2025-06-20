import { useState, useEffect } from 'react';
import axios from '../axios';

const TicketForm = ({ projectId, onCreated }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Low',
    status: 'To Do',
    assignee: '',
  });

  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (!projectId) return;
    const token = localStorage.getItem('token');
    axios.get('/api/projects', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const project = res.data.find(p => p._id === projectId);
      setMembers(project?.teamMembers || []);
    });
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('/api/tickets', {
      ...form,
      projectId,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    onCreated?.();
    setForm({ title: '', description: '', priority: 'Low', status: 'To Do', assignee: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-bg-200 text-text-100 p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold text-primary-100">Create a Ticket</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full border border-bg-300 p-2 rounded bg-bg-100 text-text-100"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full border border-bg-300 p-2 rounded bg-bg-100 text-text-100"
      />

      <select
        name="priority"
        value={form.priority}
        onChange={(e) => setForm({ ...form, priority: e.target.value })}
        className="w-full border border-bg-300 p-2 rounded bg-bg-100 text-text-100"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <select
        name="status"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        className="w-full border border-bg-300 p-2 rounded bg-bg-100 text-text-100"
      >
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <select
        name="assignee"
        value={form.assignee}
        onChange={(e) => setForm({ ...form, assignee: e.target.value })}
        className="w-full border border-bg-300 p-2 rounded bg-bg-100 text-text-100"
      >
        <option value="">-- Select Assignee --</option>
        {members.map(m => (
          <option key={m._id} value={m._id}>
            {m.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-primary-100 hover:bg-primary-200 text-white px-4 py-2 rounded w-full"
      >
        Create Ticket
      </button>
    </form>
  );
};

export default TicketForm;
