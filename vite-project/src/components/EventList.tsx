import React, { useEffect, useState } from 'react';
import "../styles/EventList.css";
import { useNavigate } from 'react-router-dom'; // import useNavigate

export interface Event {
  id: number;
  name: string;
  coverImage: string;
  date: string;
  description: {
    short: string;
    long: string;
  };
  dresscode: string;
  price: number;
  includedDrinks: string[];
  tags: string[];
  isAperitivoIncluded: boolean;
  includedDishes?: {
    name: string;
    description: string;
    allergens: string[];
  }[];
}

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  let navigate = useNavigate(); // hook for navigation


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://its-events.davide-mantovani.workers.dev/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Function to handle event click
  const handleEventClick = (event: Event) => {
    // Navigate to the EventDetail page with the event's id
    navigate(`/event/${event.id}`, { state: { event } });
  };



  return (
    <div className="event-list-container">
      {events.map((event) => (
        <div key={event.id} className="event-card" onClick={() => handleEventClick(event)}>
          <img src={event.coverImage} alt={event.name} className="event-image" />
          <div className="event-info">
            <h2 className="event-title">{event.name}</h2>
            <p className="event-description">{event.description.short}</p>
            <p className="event-date">{event.date}</p>
            {/* se voglio aggiungere altro, buuuh */}
          </div>
        </div>
      ))}
    </div>
  );
};


export default App;