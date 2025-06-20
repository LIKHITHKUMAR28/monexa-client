import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Calendar from '../components/Calendar';
import ProjectDirectory from '../components/ProjectDirectory';
import UrgentTasks from '../components/UrgentTasks';
import CreateTicketModal from '../components/CreateTicketModal';
import TicketList from '../components/TicketList';
import KanbanBoard from '../components/KanbanBoard';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');

    setUsername(storedName || 'User');
    setRole(storedRole || 'Member');
  }, []);

  return (
    <div className="flex bg-bg-100 text-text-100 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 space-y-6">
        {/* Header */}
        <header className="flex justify-between items-center">
          {/* Logo (top-left) */}
          <img
            src="https://i.ibb.co/8DRBSSnq/Screenshot-2025-06-19-222854-1.png"
            alt="Monexa Logo"
            className="h-32 w-auto max-w-[200px] object-contain"
          />

          {/* Welcome (top-right) */}
          <div className="text-right">
            <h1 className="text-xl font-bold text-primary-400">Welcome, {username} 👋</h1>
            <p className="text-sm text-text-200">Role: {role}</p>
          </div>
        </header>

        {/* Show "+ Create Ticket" only if project is selected */}
        {selectedProject && (
          <div className="flex justify-end">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-primary-100 hover:bg-primary-200 text-white px-4 py-2 rounded transition"
            >
              + Create Ticket
            </button>
          </div>
        )}

        {/* Grid Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Calendar />
          <UrgentTasks selectedProject={selectedProject} />
          <ProjectDirectory
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
        </div>

        {selectedProject && (
          <>
            <KanbanBoard projectId={selectedProject._id} />
            <TicketList projectId={selectedProject._id} />
          </>
        )}

        <CreateTicketModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          projectId={selectedProject?._id}
          onCreated={() => {}}
        />
      </main>
    </div>
  );
};

export default Dashboard;
