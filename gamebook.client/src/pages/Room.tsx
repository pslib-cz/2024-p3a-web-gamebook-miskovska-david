import React, { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';

const Room: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [RoomComponent, setRoomComponent] = useState<React.FC | null>(null);

  useEffect(() => {
    const loadRoomComponent = async () => {
      try {
        // Dynamicky načteme komponentu na základě ID
        const roomComponent = await import(`./Room${id}`);
        setRoomComponent(() => roomComponent.default);
      } catch (error) {
        console.error('Error loading room component:', error);
      }
    };

    loadRoomComponent();
  }, [id]);

  if (!RoomComponent) {
    return <div>Loading...</div>;
  }

  const nextRoomId = id ? parseInt(id) + 1 : 1;

  return (
    <div>
      <RoomComponent />
      <button onClick={() => navigate(`/rooms/${nextRoomId}`)}> {nextRoomId} </button>
    </div>
  );
};

export default Room;