import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Folder, Wrench, LogOut } from 'lucide-react'; // Wrench icon for editing

const Sidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', icon: <Home />, label: 'Dashboard' },
    { path: '/projects', icon: <Folder />, label: 'Create Project' },
    { path: '/projects/edit', icon: <Wrench />, label: 'Edit Projects' }, // 🔁 Replaced Ticket with Edit
  ];

  return (
    <aside className="hidden md:flex flex-col items-center w-20 bg-bg-200 text-text-100 py-6 space-y-6">
  <span className="text-lg font-bold text-primary-200">M</span>

  {navItems.map(({ path, icon }, index) => (
    <NavLink
      key={index}
      to={path}
      className={({ isActive }) =>
        `w-10 h-10 flex items-center justify-center rounded-lg transition ${
          isActive ? 'bg-primary-100' : 'hover:bg-bg-300'
        }`
      }
    >
      {icon}
    </NavLink>
  ))}

      <button
        title="Logout"
        onClick={() => {
          localStorage.clear();
          navigate('/login');
        }}
        className="mt-auto text-red-400 hover:text-red-500"
      >
        <LogOut />
      </button>
    </aside>
  );
};

export default Sidebar;
