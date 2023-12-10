import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventDetail from './components/EventDetail'; // Componente per i dettagli dell'evento

import EventList from './components/EventList'; // La tua componente esistente per la lista degli eventi

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/event/:eventId" element={<EventDetail />} />
      </Routes>
    </Router>
  );
};

export default App;