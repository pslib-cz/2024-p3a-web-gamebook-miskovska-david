import React from 'react';
import { useNavigate } from 'react-router-dom';

const Room1: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Room 1</h2>
      <p>This is the content of Room 1.</p>
      <button onClick={() => navigate(`/rooms/2`)}>
        Přejít na místnost 2
      </button>
    </div>
  );
};

export default Room1;