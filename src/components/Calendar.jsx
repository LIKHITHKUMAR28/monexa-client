import { useState } from 'react';
import dayjs from 'dayjs';

const Calendar = () => {
  const [month, setMonth] = useState(dayjs());
  const today = dayjs();

  const startOfMonth = month.startOf('month').day();
  const daysInMonth = month.daysInMonth();

  const prevMonth = () => setMonth(month.subtract(1, 'month'));
  const nextMonth = () => setMonth(month.add(1, 'month'));

  const generateDays = () => {
    const days = [];
    for (let i = 0; i < startOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(dayjs(`${month.format('YYYY-MM')}-${i}`));
    }
    return days;
  };

  return (
    <div className="bg-bg-200 text-text-100 p-4 rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={prevMonth}
          className="px-2 py-1 rounded bg-primary-100 hover:bg-primary-200 text-white"
        >
          &lt;
        </button>
        <h2 className="text-lg font-bold">{month.format('MMMM YYYY')}</h2>
        <button
          onClick={nextMonth}
          className="px-2 py-1 rounded bg-primary-100 hover:bg-primary-200 text-white"
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-sm text-text-200 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day}>{day}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-sm">
        {generateDays().map((day, i) => (
          <div
            key={i}
            className={`py-2 text-center rounded transition ${
              day?.isSame(today, 'day') ? 'bg-primary-400 text-white font-semibold' : 'bg-bg-300'
            }`}
          >
            {day ? day.date() : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
