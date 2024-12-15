import style from "./Room05.module.css";
import React, { useEffect, useState } from "react";
import { RoomType } from "../../types";

const Room04: React.FC= () => {
    const [rooms, setRooms] = useState<RoomType | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [displayedText, setDisplayedText] = useState<string>("");
    
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
    if (rooms?.dialogs?.[6]) {
        const fullText = rooms.dialogs[6];
        let index = 0;

        setDisplayedText(""); 

        const interval = setInterval(() => {
            if (index <= fullText.length) {
                setDisplayedText(fullText.slice(0, index));
                index += 1;
            } 
            else {
                clearInterval(interval);
    
            }
        }, 70); 

        return () => clearInterval(interval); 
    }
}, [rooms]);


    return (
        <div
            className={style.room__screen}
            style={{ backgroundImage: `url(/${rooms?.background})` }}>
            <div className={style.room__container}>
                <p className={style.room__text}>{displayedText}</p>
            </div>
        </div>
    );

}
export default Room04;