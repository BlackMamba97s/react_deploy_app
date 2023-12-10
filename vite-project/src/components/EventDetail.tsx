import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Event } from './EventList'; 
import "../styles/EventDetail.css";


const EventDetail = () => {
  let { eventId } = useParams();
  const location = useLocation();
  const [eventDetail, setEventDetail] = useState<Event | null>(location.state?.event || null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [slots, setSlots] = useState<string[]>([]);

  useEffect(() => {
      async function fetchEventDetails() {
        try {
          const response = await fetch(`https://its-events.davide-mantovani.workers.dev/events/${eventId}`);
          const data: Event = await response.json();
          setEventDetail(data);
        } catch (error) {
          console.error('Error fetching event details:', error);
        }
      }
      fetchEventDetails();

      // Set slots here<
      if (eventDetail) {
      setSlots(generateTimeSlots(eventDetail.date));
      console.log(eventDetail);
      }

  }, [eventId]);


  const generateTimeSlots = (startTime: string | number | Date) => {
    let slots = [];
    let eventStartTime = new Date(startTime);

    for (let i = 0; i < 6; i++) {
      let slotTime = new Date(eventStartTime.getTime() + i * 15 * 60000);
      slots.push(slotTime.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }));
    }

    return slots;
  };

  const handleSlotSelection = (slot: React.SetStateAction<string>) => {
    setSelectedSlot(slot);
  };

  const handleBooking = () => {
    if (!selectedSlot) {
      alert('Please select a time slot.');
      return;
    }

    alert(`Booking successful for slot: ${selectedSlot}`);
    // Se voglio usare firebase parto da qua, poi si vedrà
  };

  const formatDate = (dateString: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (eventDetail) {
    return (
      <div className="event-detail-container">
        <img src={eventDetail.coverImage} alt={eventDetail.name} className="event-detail-image" />
        <h2 className="event-detail-title">{eventDetail.name}</h2>
        <p className="event-detail-date">{formatDate(eventDetail.date)}</p>
        <p className="event-detail-description">{eventDetail.description.long}</p>
        <p><strong>Dress Code:</strong> {eventDetail.dresscode}</p>
        <p><strong>Price:</strong> ${eventDetail.price}</p>
        <p><strong>Included Drinks:</strong> {eventDetail.includedDrinks.join(', ')}</p>
        <p><strong>Tags:</strong> {eventDetail.tags.join(', ')}</p>
        <p><strong>Aperitivo Included:</strong> {eventDetail.isAperitivoIncluded ? '✔️' : '❌'}</p>
        {eventDetail.includedDishes && (
          <div>
            <strong>Included Dishes:</strong>
            {eventDetail.includedDishes.map((dish, index) => (
              <p key={index}>{dish.name} - {dish.description}</p>
            ))}
          </div>
        )}
        <div className="event-booking">
          <h3>Select a time slot:</h3>
          <div className="slots-container">
            {slots.map(slot => (
              <button key={slot} onClick={() => handleSlotSelection(slot)} className={`slot-button ${selectedSlot === slot ? 'selected' : ''}`}>
                {slot}
              </button>
            ))}
          </div>
          <button onClick={handleBooking} className="event-booking-button">Book Now</button>
        </div>
      </div>
    );
  } else {
    // Render a loading state or some placeholder content
    return <div>Loading event details...</div>;
  }
};

export default EventDetail;
