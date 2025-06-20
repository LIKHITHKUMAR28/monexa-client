import { useEffect, useState } from 'react';
import axios from '../axios';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';

const statusColumns = ['To Do', 'In Progress', 'Done'];

const KanbanBoard = ({ projectId }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (!projectId) return;
    const token = localStorage.getItem('token');
    axios.get(`/api/tickets/project/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setTickets(res.data));
  }, [projectId]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const updatedTickets = tickets.map(t =>
      t._id === draggableId ? { ...t, status: destination.droppableId } : t
    );
    setTickets(updatedTickets);

    const movedTicket = updatedTickets.find(t => t._id === draggableId);
    const token = localStorage.getItem('token');
    await axios.put(`/api/tickets/${draggableId}`, {
      ...movedTicket,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  return (
    <div className="p-6 bg-bg-200 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-white-100 mb-4">📋 Kanban Board</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statusColumns.map((column) => (
            <Droppable key={column} droppableId={column}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-bg-300 p-4 rounded-lg min-h-[300px] shadow-sm"
                >
                  <h3 className="text-md font-semibold text-primary-400 mb-3">{column}</h3>
                  {tickets
                    .filter((t) => t.status === column)
                    .map((ticket, index) => (
                      <Draggable key={ticket._id} draggableId={ticket._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-bg-100 text-text-100 p-3 mb-3 rounded shadow transition hover:shadow-lg"
                          >
                            <p className="font-semibold">{ticket.title}</p>
                            <p className="text-sm text-text-200">{ticket.priority}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
