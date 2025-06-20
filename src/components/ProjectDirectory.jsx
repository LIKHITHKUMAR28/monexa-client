import { useEffect, useState } from 'react';
import axios from '../axios';

const ProjectDirectory = ({ selectedProject, setSelectedProject }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/projects', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setProjects(res.data));
  }, []);

  return (
    <div className="bg-bg-200 p-4 rounded-lg shadow text-text-100">
      <h2 className="text-lg font-bold text-white-100 mb-3">🗂 Project Directory</h2>
      {projects.length === 0 ? (
        <p className="text-sm text-text-200">No projects available.</p>
      ) : (
        <ul className="space-y-2">
          {projects.map(p => (
            <li
              key={p._id}
              onClick={() => setSelectedProject(p)}
              className={`cursor-pointer p-2 rounded-lg transition border border-bg-300 ${
                selectedProject?._id === p._id
                  ? 'bg-primary-300 text-black font-semibold'
                  : 'bg-bg-300 hover:bg-primary-200 hover:text-black'
              }`}
            >
              {p.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectDirectory;
