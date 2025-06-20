import { useEffect, useState } from 'react';
import axios from '../axios';

const EditProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({ title: '', description: '' });
  const [members, setMembers] = useState([]);
  const [memberInput, setMemberInput] = useState({ userId: '', role: '' });
  const [status, setStatus] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects(res.data);
      } catch (err) {
        setStatus('❌ Failed to load projects');
      }
    };
    fetchProjects();
  }, [token]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!selectedId) return;
      try {
        const res = await axios.get(`/api/projects/${selectedId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setForm({ title: res.data.title, description: res.data.description });
        setMembers(res.data.members || []);
        setStatus('');
      } catch (err) {
        setStatus('❌ Failed to load project details');
      }
    };
    fetchProjectDetails();
  }, [selectedId, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/projects/${selectedId}`,
        { ...form, members },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus('✅ Project updated successfully');
    } catch (err) {
      setStatus('❌ Failed to update project');
    }
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!memberInput.userId || !memberInput.role) return;
    setMembers([...members, memberInput]);
    setMemberInput({ userId: '', role: '' });
  };

  const handleRemoveMember = (index) => {
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
  };

  return (
    <div className="min-h-screen bg-bg-100 text-text-100 p-6">
      <div className="max-w-3xl mx-auto bg-bg-200 p-6 rounded-xl shadow space-y-6">
        <h2 className="text-2xl font-bold text-white-100">📝 Edit Projects</h2>

        {/* Select project */}
        <div>
          <label className="block mb-2 font-semibold text-text-100">Select Project</label>
          <select
            value={selectedId || ''}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full border border-bg-300 p-2 rounded bg-bg-100 text-text-100"
          >
            <option value="" disabled>Select a project...</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>

        {selectedId && (
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              placeholder="Project Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-bg-300 p-2 rounded bg-bg-100 text-text-100"
              required
            />
            <textarea
              placeholder="Project Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-bg-300 p-2 rounded bg-bg-100 text-text-100"
            ></textarea>

            <div className="space-y-2">
              <h3 className="font-semibold text-primary-400">Assigned Members</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="User ID"
                  value={memberInput.userId}
                  onChange={(e) => setMemberInput({ ...memberInput, userId: e.target.value })}
                  className="flex-1 border border-bg-300 p-2 rounded bg-bg-100 text-text-100"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={memberInput.role}
                  onChange={(e) => setMemberInput({ ...memberInput, role: e.target.value })}
                  className="flex-1 border border-bg-300 p-2 rounded bg-bg-100 text-text-100"
                />
                <button
                  onClick={handleAddMember}
                  className="bg-primary-100 hover:bg-primary-200 text-white px-3 py-2 rounded"
                >
                  Add
                </button>
              </div>

              {members.length > 0 && (
                <table className="w-full mt-4 text-sm border border-bg-300 rounded overflow-hidden">
                  <thead>
                    <tr className="bg-bg-300 text-text-100">
                      <th className="p-2 border border-bg-300">User ID</th>
                      <th className="p-2 border border-bg-300">Role</th>
                      <th className="p-2 border border-bg-300">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((m, idx) => (
                      <tr key={idx}>
                        <td className="p-2 border border-bg-300">{m.userId}</td>
                        <td className="p-2 border border-bg-300">{m.role}</td>
                        <td className="p-2 border border-bg-300 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveMember(idx)}
                            className="text-red-400 hover:underline"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            >
              Save Changes
            </button>

            {status && <p className="text-sm mt-2 text-primary-300">{status}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProjectsPage;
