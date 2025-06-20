import { useEffect, useState } from 'react';
import axios from '../axios';

const TicketList = ({ projectId }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/tickets/project/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTickets(res.data);
      } catch (err) {
        console.error('Failed to fetch tickets:', err);
      }
    };

    if (projectId) fetchTickets();
  }, [projectId]);

  const handleDelete = async (ticketId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/tickets/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(tickets.filter((t) => t._id !== ticketId));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="bg-bg-200 p-5 rounded-xl shadow-lg mt-6">
      <h2 className="text-xl font-bold text-white mb-4">🎟️ Tickets</h2>

      {tickets.length === 0 ? (
        <p className="text-text-200 italic">No tickets created yet.</p>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-bg-300 text-text-100 rounded-lg shadow-md p-4 flex flex-col sm:flex-row sm:items-center justify-between transition hover:shadow-xl"
            >
              <div>
                <h3 className="text-lg font-semibold">{ticket.title}</h3>
                <p className="text-text-200 text-sm mt-1">{ticket.description}</p>
                <div className="flex flex-wrap gap-4 text-xs text-text-200 mt-2">
                  <span>Status: {ticket.status}</span>
                  <span>Priority: {ticket.priority}</span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(ticket._id)}
                className="text-red-400 hover:text-red-300 text-sm mt-3 sm:mt-0"
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;
