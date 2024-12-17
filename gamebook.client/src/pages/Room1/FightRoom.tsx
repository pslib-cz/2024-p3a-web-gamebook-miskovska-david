import React, { useEffect, useState } from "react";
import { RoomType } from "../../types";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const FightRoom: React.FC= () => {
    const [rooms, setRooms] = useState<RoomType | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [visibleDialogIndex, setVisibleDialogIndex] = useState(0);
    
    const id = useParams().id
    const idNumber = id ? parseInt(id): 0; 

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try{
                const response = await fetch("/api/Room/rooms/2"); //Ta 1 je id místnosti, kterou chceme načíst. To pak se bude měnit v routě, takže místo 1 tam bude proměnná.
            if(!response.ok){
                throw new Error("Nepodařilo se načíst místnosti")
            }
            const data = await response.json();
            setRooms(data)
            }
            catch(error){
                if(error instanceof Error){
                    setError(error)
                }else{
                    setError(new Error("Něco se pokazilo"))
                }
            }finally{
                setLoading(false)
            }
        }
        fetchData();
    }, []);
   console.log(error);
   console.log(loading);
   useEffect(() => {
    if (rooms?.dialogs && visibleDialogIndex < 2) {
      const currentText = rooms.dialogs[visibleDialogIndex]; // Získání aktuální věty
      const animationDuration = currentText.length * 70; 
      const timer = setTimeout(() => {
        setVisibleDialogIndex((prevIndex) => prevIndex + 1);
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [visibleDialogIndex, rooms]);

  return(
    <div style={{ backgroundImage: `url(/${rooms?.background})` }}>
    <p>Fight room</p>
    <Link to={`/rooms/${idNumber+1}`}>Pokračovat</Link>
  </div>
  );

}
export default FightRoom;