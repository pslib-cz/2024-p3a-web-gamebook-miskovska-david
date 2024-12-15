import style from "./Room04.module.css";
import React, { useEffect, useState } from "react";
import Pokracovat from "../../components/Button/Pokracovat";
import { RoomType } from "../../types";

const Room06: React.FC= () => {
    const [rooms, setRooms] = useState<RoomType | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [isTextComplete, setIsTextComplete] = useState<boolean>(false);
    const [displayedText, setDisplayedText] = useState<string>("");
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try{
                const response = await fetch("/api/Room/rooms/2"); 
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
    if (rooms?.dialogs?.[7]) {
        const fullText = rooms.dialogs[7];
        let index = 0;

        setDisplayedText(""); 

        const interval = setInterval(() => {
            if (index <= fullText.length) {
                setDisplayedText(fullText.slice(0, index));
                index += 1;
            } 
            else {
                clearInterval(interval);
                setIsTextComplete(true);
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
                {isTextComplete && <Pokracovat text="Pokračovat" />}
            </div>
        </div>
    );

}
export default Room06;