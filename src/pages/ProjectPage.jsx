import { useState, useEffect } from 'react';
import axios from '../axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectPage = () => {
  const { id } = useParams(); // project ID from URL (for editing)
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: '', description: '' });
  const [members, setMembers] = useState([]);
  const [memberInput, setMemberInput] = useState({ userId: '', role: '' });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setForm({ title: res.data.title, description: res.data.description });
        setMembers(res.data.members || []);
        setIsEditing(true);
      } catch (err) {
        setError('Failed to load project');
      }
    };

    fetchProject();
  }, [id]);

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!memberInput.userId || !memberInput.role) return;
    setMembers([...members, memberInput]);
    setMemberInput({ userId: '', role: '' });
  };

  const handleRemoveMember = (idx) => {
    setMembers(members.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      if (isEditing) {
        await axios.put(
          `/api/projects/${id}`,
          { ...form, members },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          '/api/projects',
          { ...form, members },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setSuccess(true);
      if (!isEditing) {
        setForm({ title: '', description: '' });
        setMembers([]);
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to save project');
    }
  };

  return (
    <div className="min-h-screen bg-bg-100 text-text-100 p-6">
      <div className="max-w-2xl mx-auto bg-bg-200 p-6 rounded-xl shadow space-y-6">
        <h2 className="text-2xl font-bold text-white-100">
          {isEditing ? 'Edit Project' : '🗃️ Create New Project'}
        </h2>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm">
            Project {isEditing ? 'updated' : 'created'} successfully!
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Project Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-bg-300 bg-bg-100 p-2 rounded"
            required
          />
          <textarea
            placeholder="Project Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-bg-300 bg-bg-100 p-2 rounded"
          />

          <div className="space-y-3">
            <h3 className="font-semibold text-primary-400">Assigned Members</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="User ID"
                value={memberInput.userId}
                onChange={(e) =>
                  setMemberInput({ ...memberInput, userId: e.target.value })
                }
                className="flex-1 border border-bg-300 p-2 rounded bg-bg-100"
              />
              <input
                type="text"
                placeholder="Role"
                value={memberInput.role}
                onChange={(e) =>
                  setMemberInput({ ...memberInput, role: e.target.value })
                }
                className="flex-1 border border-bg-300 p-2 rounded bg-bg-100"
              />
              <button
                onClick={handleAddMember}
                className="bg-primary-100 hover:bg-primary-200 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>

            {members.length > 0 && (
              <table className="w-full mt-4 text-sm border border-bg-300">
                <thead className="bg-bg-300 text-text-100">
                  <tr>
                    <th className="p-2 border">User ID</th>
                    <th className="p-2 border">Role</th>
                    <th className="p-2 border">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m, idx) => (
                    <tr key={idx}>
                      <td className="p-2 border">{m.userId}</td>
                      <td className="p-2 border">{m.role}</td>
                      <td className="p-2 border text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(idx)}
                          className="text-red-500 hover:underline"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="bg-primary-100 hover:bg-accent-200 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary-100 hover:bg-primary-200 text-white px-4 py-2 rounded"
            >
              {isEditing ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectPage;
