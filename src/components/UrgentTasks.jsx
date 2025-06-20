import { useEffect, useState } from 'react';
import axios from '../axios';

const UrgentTasks = ({ selectedProject }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!selectedProject) return;
    const token = localStorage.getItem('token');
    axios.get(`/api/tickets/project/${selectedProject._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const urgent = res.data.filter(t =>
        t.priority === 'High' || t.status === 'To Do'
      );
      setTasks(urgent);
    });
  }, [selectedProject]);

  return (
    <div className="bg-bg-200 text-text-100 p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold text-primary-400 mb-3">⏰ Urgent Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-sm text-text-200">No urgent tasks found.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {tasks.map(task => (
            <li
              key={task._id}
              className="flex justify-between items-center p-2 bg-bg-300 rounded shadow-sm"
            >
              <span className="truncate">{task.title}</span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  task.priority === 'High'
                    ? 'bg-red-500 text-white'
                    : 'bg-yellow-500 text-white'
                }`}
              >
                {task.priority}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UrgentTasks;
