import React from 'react';

const Calendar = () => {
  const calendarId = process.env.REACT_APP_GOOGLE_CALENDAR_ID; // Replace with your public Google Calendar ID
  const calendarSrc = `https://calendar.google.com/calendar/embed?src=${calendarId}&mode=MONTH&ctz=Europe/Berlin`;

  return (
    <div className="w-full h-full">
      <iframe
        src={calendarSrc}
        style={{ border: 0 }}
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        title="Google Calendar"
      ></iframe>
    </div>
  );
};

export default Calendar;
