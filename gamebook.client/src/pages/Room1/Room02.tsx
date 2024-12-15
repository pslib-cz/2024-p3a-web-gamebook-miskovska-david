import style from "./Room02.module.css";
import React, { useEffect, useState } from "react";
import Pokracovat from "../../components/Button/Pokracovat";
import { RoomType } from "../../types";

const Room02: React.FC= () => {
    const [rooms, setRooms] = useState<RoomType | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [visibleDialogIndex, setVisibleDialogIndex] = useState(0);
    
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
    <div
    className={style.room__screen}
    style={{ backgroundImage: `url(/${rooms?.background}` }}>
    <div className={style.room__container}>
      {rooms?.dialogs.slice(0, visibleDialogIndex + 1 ).map((dialog, index) => (
        <p key={index} className={style.room__text}>
          {dialog}
        </p>
      ))}
      {visibleDialogIndex >= 2 && <Pokracovat text="Pokračovat" />}
    </div>
  </div>
  );

}
export default Room02;