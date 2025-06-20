import { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectSelector = ({ selectedProject, setSelectedProject }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/projects', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setProjects(res.data));
  }, []);

  return (
    <div className="bg-bg-200 text-text-100 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-primary-100 mb-2">Select a Project</h2>
      <select
        className="w-full border border-bg-300 bg-bg-100 text-text-100 p-2 rounded focus:outline-none focus:border-primary-100"
        value={selectedProject?._id || ''}
        onChange={(e) => {
          const project = projects.find(p => p._id === e.target.value);
          setSelectedProject(project || null);
        }}
      >
        <option value="">-- Choose a project --</option>
        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectSelector;
