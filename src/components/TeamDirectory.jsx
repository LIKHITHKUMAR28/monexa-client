import { useEffect, useState } from 'react';
import axios from '../axios';

const TeamDirectory = ({ selectedProject }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (!selectedProject) return;

    const token = localStorage.getItem('token');
    axios
      .get(`/api/projects/${selectedProject._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Use res.data.members: [{ userId, role }]
        setMembers(res.data.members || []);
      });
  }, [selectedProject]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg mb-3">Team Directory</h2>
      <div className="grid grid-cols-2 gap-3 text-sm">
        {members.length === 0 ? (
          <p className="text-gray-500">No members assigned</p>
        ) : (
          members.map((m, idx) => (
            <div key={idx} className="p-2 border rounded text-center">
              <p className="font-semibold">{m.userId}</p>
              <p className="text-gray-500">{m.role}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeamDirectory;
