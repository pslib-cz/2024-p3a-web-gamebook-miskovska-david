import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const FightRoom: React.FC= () => {
    const [visibleDialogIndex, setVisibleDialogIndex] = useState(0);
    
    const id = useParams().id
    const idNumber = id ? parseInt(id): 0; 

    const {data} = useFetch(`/api/Room/rooms/${idNumber}`);

   useEffect(() => {
    if (data?.dialogs && visibleDialogIndex < 2) {
      const currentText = data.dialogs[visibleDialogIndex]; // Získání aktuální věty
      const animationDuration = currentText.length * 70; 
      const timer = setTimeout(() => {
        setVisibleDialogIndex((prevIndex) => prevIndex + 1);
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [visibleDialogIndex, data]);

  return(
    <div style={{ backgroundImage: `url(/${data?.background})` }}>
    <p>Fight room</p>
    <Link to={`/rooms/${idNumber+1}`}>Pokračovat</Link>
  </div>
  );

}
export default FightRoom;